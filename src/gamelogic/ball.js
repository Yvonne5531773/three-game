// import THREE from '../../libs/three.min'

/*
Interface GameScene

getScene();
getBallMaterial();
*/
export default class Ball {
	//1.1 : 1
	size = 16;
	height = 10.47;
	cube = null;
	speed = new THREE.Vector3(0, 0, 0);
	trail = [];
	gameScene = null;
	vertical = new THREE.Vector3(0.5, 0.5, 0);

	constructor() {

	}

	setGameScene(gameScene) {
		this.gameScene = gameScene
	}

	createElement() {
		this.createCube()
	}

	createCube() {
		var cubeGeometry = new THREE.BoxGeometry(this.size, this.size, this.height);
		var material = this.gameScene.getBallMaterial();
		var cube = new THREE.Mesh(cubeGeometry, material);
		cube.updateMatrix();
		cube.castShadow = true;
		cube.visible = false;
		this.cube = cube;
		this.gameScene.getScene().add(cube);
	};

	startSegment(startpos, direction, corner) {
		var xyDirection = direction.clone();
		xyDirection.z = 0;
		var yalix = new THREE.Vector3(0, 1, 0);
		var angle = yalix.angleTo(xyDirection);
		if (xyDirection.x > 0) {
			angle = -angle;
		}
		this.cube.position.copy(startpos);
		this.cube.rotation.z = angle;
		//create new cube
		var cubeGeometry = new THREE.BoxGeometry(this.size, this.size, this.height);
		var material = this.gameScene.getBallMaterial();

		var cubeCorner = new THREE.Mesh(cubeGeometry, material);
		cubeCorner.position.copy(startpos);
		cubeCorner.rotation.z = angle;

		var cubTail = null;
		if (corner) {
			//第一个位置拐角方块先隐藏
			if (this.trail.length == 0) {
				cubeCorner.visible = false;
			}
			this.gameScene.getScene().add(cubeCorner);
			this.trail.push(cubeCorner);
			cubTail = cubeCorner.clone();
		} else {
			cubTail = cubeCorner;
		}
		cubTail.visible = false;
		this.gameScene.getScene().add(cubTail);
		this.trail.push(cubTail);
	}

	doneSegment(startpos, endpos) {
		var vecSeg = endpos.clone();
		vecSeg.sub(startpos);
		vecSeg.z = 0;
		// var yalix = new THREE.Vector3(0, 1, 0);
		// var angle = yalix.angleTo(vecSeg);
		// if (vecSeg.x > 0) {
		// 	angle = -angle;
		// }
		var cube = this.trail[this.trail.length - 1];
		if (cube) {
			cube.position.addVectors(startpos, endpos);
			cube.position.divideScalar(2);
			cube.scale.y = vecSeg.length() / this.size;
		}
	}

	walkSegment (startpos, endpos, droped) {
		//第一处拐角方块
		console.log('in walkSegment this.trail', this.trail)
		if (this.trail.length === 2) {
			let cube = this.trail[0];
			if (cube) {
				cube.visible = true
				cube.rotation.y = Math.PI* -0.25
			}
		}
		this.cube.position.copy(endpos);
		if (!droped) {
			let tail = this.trail[this.trail.length - 1];
			if (tail) {
				let vecSeg = endpos.clone()
				vecSeg.sub(startpos)
				vecSeg.y = 0
				tail.rotation.y = Math.PI* -0.25
				tail.visible = true
				console.log('in walkSegment startpos', startpos)
				console.log('in walkSegment endpos', endpos)
				tail.position.addVectors(startpos, endpos)
				tail.position.divideScalar(2)
				console.log('in walkSegment vecSeg.length()', vecSeg.length())
				tail.scale.z = vecSeg.length() / this.size
			}
		}
	}

	bumpWall(startpos) {

	}

	flyOut(startpos) {

	}
}
