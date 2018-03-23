import THREE from '../../libs/three.min'
	
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

	//calc
	normals = [];
	rects = [];
	
	constructor() {
		
	}
}
	
export default class Map
{
	box = 1000;
	size = 14;
	checkMode = 0;
	
	horizon = new THREE.Vector3(0.5, -0.5, 0);
	gravity = new THREE.Vector3(0, 0, -1);
	
	standBlock = null; //当前地图块节点

	constructor () {

	}
	
	generateFromJson(jsonStr) {

		var nodeCursor = null;
		

		var json = JSON.parse(jsonStr);
		if (json) {
			
			for (var i = 0; i < json.length; ++i) {
				var obj = json[i];
				
				var node = new Node;
				node.position.set(obj.x, obj.y, 0.02);
				node.regions.push(this.size);
				node.name = obj.name;
				
				if (obj.hasOwnProperty("boundary"))  node.boundary = (obj.boundary != 0);
				if (obj.hasOwnProperty("process"))  node.process = obj.process;
				
				if (nodeCursor) nodeCursor.links.push(node);
				if (!this.standBlock) this.standBlock = nodeCursor;
				
				nodeCursor = node;
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
