// let THREE = require('./three/three')
let THREE = require('three.min')
import 'weapp-adapter.js'

let renderer,
	camera,
	scene,
	light,
	cube = [];  //snake body object
let plane, 
	fo,
	nx = 40, ny = 40, size = 20, start_point_x = 100, start_point_y = 50,
	len = 3,
	head_pos_x = 10,
	head_pos_y = 10,
	head_for = 2,
	dir_x = [0, -1, 1, 0],
	dir_y = [1, 0, 0, -1],
	status = -1;//the status of the game, -1 represents not start
let pauseFlag = true;  //in order to support pause function
let board = []  //The state of game
let the_last_head = head_for;  //The direction of snake
let snake = [] //store snake
let clickCount = 0

export default class game3d {
	constructor() {
		this.init()
	}
	init() {
		let width = 960,
			height = 600
		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});
		renderer.setSize(960, 600);
		renderer.shadowMapEnabled = true;
		renderer.setClearColor('pink', 1.0);

		camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000);
		camera.position.x = 0;
		camera.position.y = -280;
		camera.position.z = 200;
		camera.up.x = 0;
		camera.up.y = 0;
		camera.up.z = 1;
		camera.lookAt({x: 0, y: 0, z: 0});

		scene = new THREE.Scene();

		light = new THREE.DirectionalLight('white', 1.0, 0);
		light.position.set(-600, -600, -600);
		scene.add(light);

		plane = this.createPlane(400);
		plane.position.set(-5, -5, -5);
		plane.receiveShadow = true;
		scene.add(plane);

		let pointColor = "#ffffff";
		let directionalLight = new THREE.DirectionalLight(pointColor);
		directionalLight.position.set(100, 180, 300);
		directionalLight.castShadow = true;

		directionalLight.distance = 0;
		directionalLight.intensity = 0.6;
		directionalLight.shadowMapHeight = 2048;
		directionalLight.shadowMapWidth = 2048;
		scene.add(directionalLight);

		for (let i = 0; i < nx; i++) { //0 = none, 1 = snake body, 2 = food
			board[i] = []
			for (let k = 0; k < ny; k++) {
				board[i][k] = 0;
			}
		}
		fo = this.createCube(10, 10, 50);
		fo.castShadow = true;
		scene.add(fo);
		for (let i = 0; i < len; i++) {
			snake[i] = {}
			snake[i].x = head_pos_x + i * dir_x[3 - head_for];
			snake[i].y = head_pos_y + i * dir_y[3 - head_for];
			cube[i] = this.createCube(10, 10, 10);
			cube[i].position.x = snake[i].x * 10 - 200;
			cube[i].position.y = -snake[i].y * 10 + 190;
			cube[i].castShadow = true;
			scene.add(cube[i]);
			board[snake[i].x][snake[i].y] = 1;
		}

		status = 0;
		this.getFood();
		this.run();
		document.addEventListener('touchstart', this.onTouchStart, false);
	}

	createCube(_s1, _s2, _s3) {
		let geometry = new THREE.BoxGeometry(_s1, _s2, _s3);
		for (let i = 0; i < geometry.faces.length; i += 2) {
			let hex = Math.random() * 0xffffff;
			geometry.faces[i].color.setHex(hex);
			geometry.faces[i + 1].color.setHex(hex);
		}
		let material = new THREE.MeshLambertMaterial({color: 0xffffff * Math.random()});
		return new THREE.Mesh(geometry, material);
	}

	createPlane(_size) {
		let geometry = new THREE.PlaneGeometry(_size, _size, 40, 40);
		let material = new THREE.MeshLambertMaterial({color: 0x00ff00});
		return new THREE.Mesh(geometry, material);
	}

	render() {
		for (let i = 0; i < len; ++i) {
			cube[i].position.x = snake[i].x * 10 - 200;
			cube[i].position.y = -snake[i].y * 10 + 190;
		}
		camera.position.y = -snake[0].y * 3 - 300;
		camera.position.x = snake[0].x * 3 - 100;
		renderer.render(scene, camera);
	}

	getMove() {
		// console.log('in move')
		let tx = snake[0].x + dir_x[head_for];
		let ty = snake[0].y + dir_y[head_for];
		//tx = (tx + nx) % nx;
		//ty = (ty + ny) % ny;
		if (tx >= 0 && tx < nx && ty >= 0 && ty < ny) {
			if (board[tx][ty] != 1) {
				the_last_head = head_for;
				if (board[tx][ty] == 2) {
					snake[len] = new Object();
					snake[len].x = snake[len - 1].x;
					snake[len].y = snake[len - 1].y;
					cube[len] = this.createCube(10, 10, 10);
					cube[len].position.x = snake[len].x * 10 - 200;
					cube[len].position.y = -snake[len].y * 10 + 190;
					cube[len].castShadow = true;
					scene.add(cube[len]);
					board[tx][ty] = 1;
					len++;
					this.getFood();
				}
				for (let i = len - 1; i > 0; i--) {
					snake[i].x = snake[i - 1].x;
					snake[i].y = snake[i - 1].y;
				}
				snake[0].x = tx;
				snake[0].y = ty;
			}
			else {
				if (the_last_head + head_for != 3) {
					wx.showToast({title: "game over!\ryour score is " + len})
					location.reload();
				}
				else {
					head_for = the_last_head;
				}
			}
		}
		else {
			wx.showToast({title: "game over!\ryour score is " + len})
			location.reload();
		}
		for (let i = 0; i < nx; i++) {
			for (let k = 0; k < ny; k++) {
				if (board[i][k] == 1)
					board[i][k] = 0;
			}
		}
		for (let i = 0; i < len; i++) {
			board[snake[i].x][snake[i].y] = 1;
		}
	}

	getFood() {
		let tx, ty;
		do {
			tx = Math.ceil(Math.random() * 1000) % nx;
			ty = Math.ceil(Math.random() * 1000) % ny;
		} while (board[tx][ty]);
		board[tx][ty] = 2;
		fo.position.x = tx * 10 - 200;
		fo.position.y = -ty * 10 + 190;
		fo.position.z = 20;
	}

	run() {
		if (!pauseFlag){
			this.getMove()
		}
		this.render();
		window.requestAnimationFrame(this.run.bind(this), canvas);
	}

	onTouchStart(event) {
		console.log('on key down pauseFlag', pauseFlag)
		pauseFlag && (pauseFlag = false)
		clickCount%2===0 && (head_for = 2)
		clickCount%2===1 && (head_for = 3)
		clickCount++
		// if (keynum == 38 && head_for != 0)
		// 	head_for = 3;
		// if (keynum == 40 && head_for != 3)
		// 	head_for = 0;
		// if (keynum == 37 && head_for != 2)
		// 	head_for = 1;
		// if (keynum == 39 && head_for != 1)
		// 	head_for = 2;
		// if (keynum == 80)
		// 	pauseFlag = !pauseFlag;
	}
	
	// start() {
	// 	// 在场景中添加雾的效果；样式上使用和背景一样的颜色
	// 	this.renderer.setSize(window.innerWidth, window.innerHeight);
	// 	let geometry = new THREE.CubeGeometry(1, 1, 1);
	// 	// 加载纹理贴图
	// 	let texture = new THREE.TextureLoader().load("images/metal.jpg");
	// 	let material = new THREE.MeshBasicMaterial({ map: texture });
	// 	this.cube = new THREE.Mesh(geometry, material);
	// 	this.scene.add(this.cube);
	// 	this.scene.add(this.createGround());
	// 	// 设置camera的高度，若是低于当前场景的高度则屁也看不到
	// 	this.camera.position.z = 10;
	// 	this.cube.castShadow = true
	//
	// 	console.log(this.cube)
	// 	window.requestAnimationFrame(this.loop.bind(this), canvas);
	// }
	// createGround(){
	// 	let geometry = new THREE.CubeGeometry(3, 3, 3);
	// 	let texture = new THREE.TextureLoader().load("images/metal.jpg");
	// 	let material = new THREE.MeshBasicMaterial({ map: texture });
	// 	let cube = new THREE.Mesh(geometry, material);
	// 	cube.position.y = -5
	// 	cube.rotation.x = 0.5
	// 	return cube
	// }
	// update() {
	// 	this.cube.rotation.x += 0.01;
	// 	this.cube.rotation.y += 0.04;
	// 	this.cube.rotation.z += 0.06;
	// }
	// loop() {
	// 	this.update()
	// 	this.renderer.render(this.scene, this.camera);
	// 	window.requestAnimationFrame(this.loop.bind(this), canvas);
	// }
}

