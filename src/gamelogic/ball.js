import THREE from '../../libs/three.min'

/*
Interface GameScene

getScene();
getBallMaterial();
*/
export default class Ball
{
	size = 14;
	height = 10.5;
	cube = null;
	speed = new THREE.Vector3(0, 0, 0);
	trail = [];
	
	gameScene = null;
	vertical = new THREE.Vector3(0.5, 0.5, 0);
	
	constructor () {
		
		
	}
	
	setGameScene (gameScene) {
		
		this.gameScene = gameScene;
		
	}
	
	createElement () {
		
		this.createCube();
	}
	
	createCube() {

		var cubeGeometry = new THREE.BoxGeometry(this.size, this.size, this.height);
		var material = this.gameScene.getBallMaterial();
		var cube = new THREE.Mesh(cubeGeometry, material);
		cube.updateMatrix();
		cube.castShadow = true;
		cube.visible = false
		this.cube = cube;

		this.gameScene.getScene().add(cube);
	};
	
	startSegment(startpos, direction) {

        var yalix = new THREE.Vector3(0, 1, 0);
        var angle = yalix.angleTo(direction);
        if (direction.x > 0) {
            angle = -angle;
        }

        //
        this.cube.position.copy(startpos);
        this.cube.rotation.z = angle;

        //create new cube
        var cubeGeometry = new THREE.BoxGeometry(this.size, this.size, this.height);
                var material = this.gameScene.getBallMaterial();

		var cubeCorner = new THREE.Mesh(cubeGeometry, material);
        cubeCorner.position.copy(startpos);
        cubeCorner.rotation.z = angle;
        this.gameScene.getScene().add(cubeCorner);
        this.trail.push(cubeCorner);

        var cubTail = cubeCorner.clone();
        this.gameScene.getScene().add(cubTail);
        this.trail.push(cubTail);
    };

    doneSegment(startpos, endpos) {

        var vecSeg = endpos.clone();
        vecSeg.sub(startpos);

        var yalix = new THREE.Vector3(0, 1, 0);
        var angle = yalix.angleTo(vecSeg);
        if (vecSeg.x > 0) {
            angle = -angle;
        }

        var cube = this.trail[this.trail.length - 1];
        if (cube != null) {
            //cube.castShadow = true;
            cube.position.addVectors(startpos, endpos);
            cube.position.divideScalar(2);

            cube.scale.y = vecSeg.length() / this.size;
        }
    };

    walkSegment(startpos, endpos) {

        this.cube.position.copy(endpos);

        var cube = this.trail[this.trail.length - 1];
        if (cube != null) {
            var vecSeg = endpos.clone();
            vecSeg.sub(startpos);

            cube.position.addVectors(startpos, endpos);
            cube.position.divideScalar(2);

            cube.scale.y = vecSeg.length() / this.size;
        }

    };
	
	bumpWall(startpos) {
		
	}
	
	flyOut(startpos) {
		
	}

}
