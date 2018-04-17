// import THREE from '../../libs/three.min'

/*
Interface GameScene

getScene();
getBallMaterial();
*/
export default class Ball {
	//1.1 : 1
	size = 20
	height = 14
	cube = null
	speed = new THREE.Vector3(0, 0, 0)
	trail = []
	gameScene = null
	vertical = new THREE.Vector3(0.5, 0.5, 0)
	boxGeometry = new THREE.BoxGeometry(this.size, this.size, this.size)

	constructor() {

	}

	getBoxGeometry () {
		return this.boxGeometry
	}

	setGameScene(gameScene) {
		this.gameScene = gameScene
	}

	createCube() {
		var cubeGeometry = this.getBoxGeometry()
		var material = this.gameScene.getBallMaterial();
		var cube = new THREE.Mesh(cubeGeometry, material);
		cube.updateMatrix();
		cube.castShadow = true;
		cube.visible = false;
		this.cube = cube;
		this.gameScene.getScene().add(cube);
	};

	startSegment(startpos, direction, corner) {
		let xyDirection = direction.clone();
		xyDirection.y = 0;
		let yalix = new THREE.Vector3(0, 1, 0),
			angle = yalix.angleTo(xyDirection);
		if (xyDirection.x > 0) {
			angle = -angle;
		}
		this.cube.position.copy(startpos);
		this.cube.rotation.z = angle;
		//create new cube
		let cubeGeometry = this.getBoxGeometry(),
			material = this.gameScene.getBallMaterial(),
			cubeCorner = new THREE.Mesh(cubeGeometry, material)
		cubeCorner.position.copy(startpos)
		cubeCorner.rotation.z = angle

		let cubTail = null
		if (corner) {
			//第一个位置拐角方块先隐藏
			if (this.trail.length === 0) {
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
		var vecSeg = endpos.clone()
		vecSeg.sub(startpos)
		vecSeg.y = 0
		var cube = this.trail[this.trail.length - 1];
		if (cube) {
			cube.position.addVectors(startpos, endpos)
			cube.position.divideScalar(2)
			cube.scale.y = vecSeg.length() / this.size
		}
	}

	walkSegment (startpos, endpos, droped) {
		// console.log('in walkSegment startpos', startpos)
		// console.log('in walkSegment endpos', endpos)
		//第一处拐角方块
		if (this.trail.length === 2) {
			let cube = this.trail[0];
			if (cube) {
				cube.visible = true
				cube.rotation.y = Math.PI* -0.25
			}
		}
		this.cube.position.copy(endpos)
		if (!droped) {
			let tail = this.trail[this.trail.length - 1];
			if (tail) {
				let vecSeg = endpos.clone()
				vecSeg.sub(startpos)
				vecSeg.y = 0
				tail.rotation.y = Math.PI* -0.25
				tail.visible = true
				tail.position.addVectors(startpos, endpos)      //三维向量相加
				tail.position.divideScalar(2)                   //用来将三维向量的(x,y,z)坐标值直接与参数scalar相除
				tail.scale.z = vecSeg.length() / this.size
			}
		}
	}

	bumpWall(startpos) {

	}

	flyOut(startpos) {

	}
}
