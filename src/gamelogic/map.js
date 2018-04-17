import { lands } from '../../models/part2/land'

class Rect {
	p1 = new THREE.Vector3();
	p2 = new THREE.Vector3();
	p3 = new THREE.Vector3();
	p4 = new THREE.Vector3();
}

class Node {
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

class Cookie {
	position = new THREE.Vector3(0, 0, 0);
	attain = false;
	index = 0;
}

export default class Map {
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

	constructor() {
		this.CalcPlaneForTest();
	}

	generateFromJson(jsonStrNode, jsonStrGrocery) {
		let json = JSON.parse(jsonStrNode);
		this.readPosition(json);
		let jsonGrocery = JSON.parse(jsonStrGrocery);
		if (jsonGrocery) {
			this.ReadDiamond(jsonGrocery);
			this.ReadCrown(jsonGrocery);
			this.ReadFloors(jsonGrocery);
		}
	}

	ReadDiamond(json) {
		let pts = json.diamonds
		if (!pts) return
		for (let i = 0; i < pts.length; ++i) {
			let pos = pts[i],
				obj = new Cookie()
			obj.position.set(pos.x, pos.y, pos.z)
			obj.index = i
			this.diamonds.push(obj)
		}
	}

	ReadCrown(json) {
		let pts = json.crowns
		if (!pts) return
		for (let i = 0; i < pts.length; ++i) {
			let pos = pts[i],
				obj = new Cookie()
			obj.position.set(pos.x, pos.y, pos.z)
			obj.index = i
			this.crowns.push(obj)
		}
	}

	ReadFloors(json) {
		let rects = json.floors
		if (!rects) return
		for (let i = 0; i < rects.length; ++i) {
			let obj = rects[i]
			//中点+尺寸写法
			if (obj.hasOwnProperty("center")) {
				let vecX = this.axesX.clone()
				vecX.multiplyScalar(obj.cx / 2)
				let vecY = this.axesY.clone()
				vecY.multiplyScalar(obj.cy / 2)
				let center = new THREE.Vector3(obj.center.x, obj.center.y, obj.center.z)
				let rect = new Rect()
				rect.p1.copy(center).sub(vecX).sub(vecY)
				rect.p2.copy(center).sub(vecX).add(vecY)
				rect.p3.copy(center).add(vecX).add(vecY)
				rect.p4.copy(center).add(vecX).sub(vecY)
				this.floors.push(rect)
			}
		}
	}

	readPosition (json) {
		let nodeCursor = null
		if (json) {
			for (let i = 0; i < json.length; ++i) {
				let obj = json[i],
					node = new Node
				node.position.set(obj.x, obj.y, obj.z)
				node.regions.push(this.size)
				node.name = obj.name
				if (obj.hasOwnProperty("boundary")) node.boundary = (obj.boundary != 0)
				if (obj.hasOwnProperty("process")) node.process = obj.process
				if (obj.hasOwnProperty("camera")) {
					let cameraNode = obj.camera
					if (cameraNode.hasOwnProperty("vx") || cameraNode.hasOwnProperty("vy") || cameraNode.hasOwnProperty("vz")) {
						node.cameraMoveVec = new THREE.Vector3(0, 0, 0)
						if (cameraNode.hasOwnProperty("vx")) node.cameraMoveVec.x = cameraNode.vx
						if (cameraNode.hasOwnProperty("vy")) node.cameraMoveVec.y = cameraNode.vy
						if (cameraNode.hasOwnProperty("vz")) node.cameraMoveVec.z = cameraNode.vz
					}
					if (cameraNode.hasOwnProperty("rx") || cameraNode.hasOwnProperty("ry") || cameraNode.hasOwnProperty("rz")) {
						node.cameraRotateVec = new THREE.Vector3(0, 0, 0)
						if (cameraNode.hasOwnProperty("rx")) node.cameraRotateVec.x = cameraNode.rx
						if (cameraNode.hasOwnProperty("ry")) node.cameraRotateVec.y = cameraNode.ry
						if (cameraNode.hasOwnProperty("rz")) node.cameraRotateVec.z = cameraNode.rz
					}
				}
				if (nodeCursor) {
					nodeCursor.links.push(node)
				}
				nodeCursor = node
				if (!this.standBlock) {
					console.log('in readPosition nodeCursor.normals', nodeCursor.normals)
					this.standBlock = nodeCursor
				}
			}
		}
		this.calcNormals()
		if (this.checkMode == 1) {
			this.calcRects()
		} else {
			this.calcRectsSimple()
		}
	}

	calcNormals () {
		function normal(node) {
			for (let i = 0; i < node.links.length; ++i) {
				let vec = node.links[i].position.clone()
				vec.sub(node.position)      //两个坐标值进行减法运算
				vec.normalize()             //对象向量进行归一化计算
				node.normals.push(vec)
				normal(node.links[i])
			}
		}
		normal(this.standBlock)
	}

	calcRects() {
		function calcNodeRect(node) {
			for (let i = 0; i < node.links.length; ++i) {
				let offsetVec = node.normals[i].clone();
				offsetVec.multiplyScalar(node.links[i].tail);

				let pt1 = node.position.clone();
				pt1.sub(offsetVec);

				let pt2 = node.links[i].position.clone();
				pt2.add(offsetVec);

				let vecCross = new THREE.Vector3(0, 0, 1);
				vecCross.cross(node.normals[i]);
				vecCross.normalize();

				offsetVec.copy(vecCross);
				offsetVec.multiplyScalar(node.regions[i]);

				let rect = new Rect;
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
		let map = this
		function calcNodeRect(node) {
			for (let i = 0; i < node.links.length; ++i) {
				let pt1 = node.position.clone();
				let pt2 = node.links[i].position.clone();
				let center = pt1.clone();
				center.add(pt2);
				center.divideScalar(2);
				let offsetH = map.horizon.clone();
				offsetH.multiplyScalar(map.box);
				let alixZ = new THREE.Vector3(0, 0, 1);
				let alixV = new THREE.Vector3(0, 0, 0);
				alixV.crossVectors(alixZ, offsetH);
				alixV.normalize();
				let vecSegment = pt2.clone();
				vecSegment.sub(pt1);
				vecSegment.projectOnVector(alixV);
				vecSegment.divideScalar(2);
				//offsetH.multiplyScalar(map.box);
				let rect = new Rect;
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

	CalcPlaneForTest() {
		/*
		let cy = 0;
		let json = [{"center":{"x":450, "y":680, "z":-12}, "cx":3300, "cy":3300}, {"center":{"x":5920, "y":6080, "z":-32}, "cx":2000, "cy":2000},{"center":{"x":2132,"y":2016,"z":-12},"cx":85,"cy":255}];
		let cz = -12;

		for (let i = 1; i < lands.length; ++i) {

			if (cy < lands[i].height) {
					cy = lands[i].height;
			}
			//{"center":{"x":450, "y":680, "z":0}, "cx":3300, "cy":3300
			//"x":3667,"y":3546
			if (lands[i].x == 3667 && lands[i].y == 3546) {
				cz += -50;
			}

			let r = {"center":{"x":lands[i].x, "y":lands[i].y, "z":cz}, "cx":lands[i].width, "cy":lands[i].height};
			json.push(r);
		}

		console.log(cy);

		const jsonStr = JSON.stringify(json);
		console.log(jsonStr);
		*/
	}
}
