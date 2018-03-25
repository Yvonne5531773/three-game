﻿import THREE from '../../libs/three.min'
	
class Rect
{
	p1 = new THREE.Vector3();
	p2 = new THREE.Vector3();
	p3 = new THREE.Vector3();
	p4 = new THREE.Vector3();
}
	
class Node
{
	tail = 14;
	name = "";        //名称：crown1,crown2,crown3 为皇冠；destination为过关点；infinite为过关后无穷远的点；其他格式无意义
	boundary = false; //节点后是不是断点
	process = 0;      //节点对应的进度
	
	position = new THREE.Vector3();
		
	links = [];
	regions = [];
	
	cameraMoveVec = null; //相机移动速度
	cameraRotateVec = null; //相机旋转速度

	//calc
	normals = [];
	rects = [];
	
	constructor() {
		
	}
}

class Cookie
{
	position = new THREE.Vector3(0, 0, 0);
	attain = false;
	index = 0;
}
	
export default class Map
{
	box = 1000;
	size = 14;
	checkMode = 0;
	
	horizon = new THREE.Vector3(0.5, -0.5, 0);
	axesX = new THREE.Vector3(1, 0, 0);
	axesY = new THREE.Vector3(0, 1, 0);
	axesZ = new THREE.Vector3(0, 0, 1);
	
	standBlock = null; //当前地图块节点
	
	diamonds = []; //钻石位置
	crowns = [];   //皇冠位置
	floors = [];   //地板矩形

	constructor () {

	}

	generateFromJson(jsonStrNode, jsonStrGrocery) {
		
		{
			var json = JSON.parse(jsonStrNode);
			this.ReadPosition(json);
		}

		var jsonGrocery = JSON.parse(jsonStrGrocery);
		if (jsonGrocery != null) {
			this.ReadDiamond(jsonGrocery);
			this.ReadCrown(jsonGrocery);
			this.ReadFloors(jsonGrocery);
		}
	}	
	
	///
	ReadDiamond(json) {
		var pts = json.diamonds;
		if (pts == null) return ;
		
		for (var i = 0; i < pts.length; ++i) {
			var pos = pts[i];
			
			var obj = new Cookie();
			obj.position.set(pos.x, pos.y, pos.z);
			obj.index = i;
			this.diamonds.push(obj);
		}
	}
	
	ReadCrown(json) {
		var pts = json.crowns;
		if (pts == null) return ;
		
		for (var i = 0; i < pts.length; ++i) {
			var pos = pts[i];
			
			var obj = new Cookie();
			obj.position.set(pos.x, pos.y, pos.z);
			obj.index = i;
			this.crowns.push(obj);
		}
	}
	
	ReadFloors(json) {
		var rects = json.floors;
		if (rects == null) return ;
		
		for (var i = 0; i < rects.length; ++i) {
			var obj = rects[i];
			//中点+尺寸写法
			if (obj.hasOwnProperty("center")) {
				var vecX = this.axesX.clone();
				vecX.multiplyScalar(obj.cx / 2);
				var vecY = this.axesY.clone();
				vecY.multiplyScalar(obj.cy / 2);
				
				var center = new THREE.Vector3(obj.center.x, obj.center.y, obj.center.z);
				
				var rect = new Rect();
				rect.p1.copy(center).sub(vecX).sub(vecY);
				rect.p2.copy(center).sub(vecX).add(vecY);
				rect.p3.copy(center).add(vecX).add(vecY);
				rect.p4.copy(center).add(vecX).sub(vecY);
				
				this.floors.push(rect);
			}
		}
	}

	ReadPosition(json) {

		var nodeCursor = null;
	
		if (json) {
			
			for (var i = 0; i < json.length; ++i) {
				var obj = json[i];
				
				var node = new Node;
				node.position.set(obj.x, obj.y, 0.02);
				node.regions.push(this.size);
				node.name = obj.name;
				
				if (obj.hasOwnProperty("boundary"))  node.boundary = (obj.boundary != 0);
				if (obj.hasOwnProperty("process"))  node.process = obj.process;
				
				if (obj.hasOwnProperty("camera")) {
					var cameraNode = obj.camera;
					
					if (cameraNode.hasOwnProperty("vx") || cameraNode.hasOwnProperty("vy") || cameraNode.hasOwnProperty("vz")) {
						node.cameraMoveVec = new THREE.Vector3(0, 0, 0);
						if (cameraNode.hasOwnProperty("vx")) node.cameraMoveVec.x = cameraNode.vx;
						if (cameraNode.hasOwnProperty("vy")) node.cameraMoveVec.y = cameraNode.vy;
						if (cameraNode.hasOwnProperty("vz")) node.cameraMoveVec.z = cameraNode.vz;
					}
					
					if (cameraNode.hasOwnProperty("rx") || cameraNode.hasOwnProperty("ry") || cameraNode.hasOwnProperty("rz")) {
						node.cameraRotateVec = new THREE.Vector3(0, 0, 0);
						if (cameraNode.hasOwnProperty("rx")) node.cameraRotateVec.x = cameraNode.rx;
						if (cameraNode.hasOwnProperty("ry")) node.cameraRotateVec.y = cameraNode.ry;
						if (cameraNode.hasOwnProperty("rz")) node.cameraRotateVec.z = cameraNode.rz;
					}
				}
				
				if (nodeCursor) nodeCursor.links.push(node);
				
				nodeCursor = node;
				
				if (!this.standBlock) this.standBlock = nodeCursor;
			}
		}

		
		this.calcNormals();
		
		if (this.checkMode == 1) {
			this.calcRects();
		} else {
			this.calcRectsSimple();
		}
		
	}
	
	calcNormals() {
		
		function Normal(node) {
			for (var i = 0; i < node.links.length; ++i) {
				var vec = node.links[i].position.clone();
				vec.sub(node.position);
				vec.normalize();
				node.normals.push(vec);
				
				Normal(node.links[i]);
			}
		}
		
		Normal(this.standBlock);
		
	}
	
	calcRects() {
		
	
		function calcNodeRect(node) {
			
			for (var i = 0; i < node.links.length; ++i) {
				
				var offsetVec = node.normals[i].clone();
				offsetVec.multiplyScalar(node.links[i].tail);
				
				var pt1 = node.position.clone();
				pt1.sub(offsetVec);
				
				var pt2 = node.links[i].position.clone();
				pt2.add(offsetVec);
		
				//
				var vecCross = new THREE.Vector3(0, 0, 1);
				vecCross.cross(node.normals[i]);
				vecCross.normalize();
				
				offsetVec.copy(vecCross);
				offsetVec.multiplyScalar(node.regions[i]);
				
				var rect = new Rect;
				rect.p1.copy(pt1);
				rect.p1.sub(offsetVec);
				
				rect.p2.copy(pt1);
				rect.p2.add(offsetVec);
				
				rect.p3.copy(pt2);
				rect.p3.add(offsetVec);
				
				rect.p4.copy(pt2);
				rect.p4.sub(offsetVec);
				
				node.rects.push(rect);
				
				calcNodeRect(node.links[i]);
			}
			
		}
		
		calcNodeRect(this.standBlock);
	
	}
	
	calcRectsSimple() {
		
		var map = this;
		
		function calcNodeRect(node) {
			
			for (var i = 0; i < node.links.length; ++i) {
				
				var pt1 = node.position.clone();
				var pt2 = node.links[i].position.clone();
				
				var center = pt1.clone();
				center.add(pt2);
				center.divideScalar(2);

				
				var offsetH = map.horizon.clone();
				offsetH.multiplyScalar(map.box);
				
				var alixZ = new THREE.Vector3(0, 0, 1);
				
				var alixV = new THREE.Vector3(0, 0, 0);
				alixV.crossVectors(alixZ, offsetH);
				alixV.normalize();
				
				var vecSegment = pt2.clone();
				vecSegment.sub(pt1);

				vecSegment.projectOnVector(alixV);
				vecSegment.divideScalar(2);
				//offsetH.multiplyScalar(map.box);
				
				var rect = new Rect;
				rect.p1.copy(center);
				rect.p1.add(offsetH);
				rect.p1.sub(vecSegment);

				rect.p2.copy(center);
				rect.p2.sub(offsetH);
				rect.p2.sub(vecSegment);
				
				rect.p3.copy(center);
				rect.p3.sub(offsetH);
				rect.p3.add(vecSegment);
				
				rect.p4.copy(center);
				rect.p4.add(offsetH);
				rect.p4.add(vecSegment);

				node.rects.push(rect);
				
				calcNodeRect(node.links[i]);
			}
			
		}
		
		calcNodeRect(this.standBlock);
	}
}
