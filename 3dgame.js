'use strict'

import './libs/weapp-adapter'
import threeDep from './parse'
let THREE = require('libs/three.min')

let renderer,
	camera,
	scene,
	light,
	cube = [];  //snake body object
let plane, 
	food,
	nx = 40, //范围宽
	ny = 40, //范围高
	planeSize = 400, //地板范围
	start_point_x = 200,
	start_point_y = 190,
	len = 1,
	head_pos_x = 6,   //开始X
	head_pos_y = 32,  //开始Y
	head_for = 2,     //方向
	dir_x = [0, -1, 1, 0],
	dir_y = [1, 0, 0, -1],
	status = -1;  //the status of the game, -1 represents not start
let pauseFlag = true;  //in order to support pause function
let board = []  //The state of game
let the_last_head = head_for;  //The direction of snake
let snake = [] //store snake
let clickCount = 0,
	gameover = false

let fps = 23,
	now,
	then = Date.now(),
	interval = 1000 / fps,
	delta

let collisions = [],
	speed = 0

let innerAudioContext

//路障
const barricades = [
	{
		x: 550, y: 630, z: 18, rotationX: -1.6, rotationY: 0.8, rotationZ: 0
	}
]
//x越大，物体就越上; y越大，物体就越里面
const whiteThickblocks = [  //粗
	{
		x: -115, y: 440, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: -28, y: 438, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 498, y: -220, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 648, y: -75, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 684, y: 148, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 98, y: 838, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 778, y: 407, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 630, y: 1310, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 805, y: 1310, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
]
const whiteMiddleblocks = [ //中; x越大，越里面；y越大，越上
	{
		x: 598, y: -150, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 664, y: 2, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 684, y: 68, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 174, y: 998, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 744, y: 225, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 238, y: 1040, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 308, y: 1120, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 858, y: 484, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 437, y: 1190, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 506, y: 1250, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 556, y: 1300, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 705, y: 1320, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 1194, y: 678, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
]
const whiteFineblocks = [ //细
	{
		x: 33, y: 550, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 68, y: 630, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 758, y: 275, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 758, y: 310, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 758, y: 345, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 356, y: 1190, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 389, y: 1190, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 928, y: 528, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 928, y: 538, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 1018, y: 578, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 740, y: 1333, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	}, {
		x: 1088, y: 610, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	}, {
		x: 1148, y: 630, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
]

//食物位置
const foodOffests = [
	{
		x: 230, y: 180
	}
]

export default class gameDanceLine {
	aRequest = {}

	constructor() {
		this.init()
	}

	init() {
		renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});
		renderer.shadowMapEnabled = true;
		renderer.setClearColor('#d8d29f', 1);

		//初始化开始的路障
		this.initMaterials()
		//食物
		this.initFood()
		//音乐
		this.initAudio()

		//相机
		camera = new THREE.PerspectiveCamera(55, 0.5, 1, 10000);
		// camera.position.set(-250, -480, 1450);  //3参数越小，离表面越近 //俯视的高度
		camera.position.set(-250, -480, 550);
		camera.up.x = 0;
		camera.up.y = 0;
		camera.up.z = 1;
		camera.lookAt({x: 250, y: 0, z: -200});

		scene = new THREE.Scene();

		light = new THREE.DirectionalLight('white', 1.0, 0);
		light.position.set(-600, -600, -600);
		scene.add(light);

		plane = this.initPlane(planeSize);
		plane.position.set(-5, -5, -5);
		plane.receiveShadow = true;
		// scene.add(plane);

		//灯源
		let directionalLight = new THREE.DirectionalLight("#fff");
		directionalLight.position.set(0, 0, 1);
		scene.add(directionalLight);

		// scene.add(new THREE.AmbientLight(0xc9c9c9));
		// var directional = new THREE.DirectionalLight(0xc9c9c9, 0.5);
		// directional.position.set(0, 0.5, 1);
		// scene.add(directional);

		// for (let i = 0; i < nx; i++) { //0 = none, 1 = snake body, 2 = food
		// 	board[i] = []
		// 	for (let k = 0; k < ny; k++) {
		// 		board[i][k] = 0;
		// 	}
		// }
		for (let i = 0; i < len; i++) {
			snake[i] = {}
			snake[i].x = head_pos_x + i * dir_x[3 - head_for];
			snake[i].y = head_pos_y + i * dir_y[3 - head_for];
			cube[i] = this.initCube(12, 12, 12);
			cube[i].position.x = snake[i].x * 10 - start_point_x;
			cube[i].position.y = -snake[i].y * 10 + start_point_y;
			cube[i].castShadow = true;
			scene.add(cube[i]);
			// board[snake[i].x][snake[i].y] = 1;
		}

		status = 0;
		this.run();

		// pauseFlag = true;
		document.addEventListener('touchstart', this.onTouchStart, false);
		document.addEventListener('resize', this.onWindowResize, false);
		this.onWindowResize()

	}

	render() {
		for (let i = 0; i < len; ++i) {
			cube[i].position.x = snake[i].x * 10 - start_point_x;
			cube[i].position.y = -snake[i].y * 10 + start_point_y;
			cube[i].position.z = 12;
		}
		//随着线的运动，镜头跟着走
		camera.position.x = snake[0].x * 4 - 480 ; //修改该值能控制物体角度
		camera.position.y = -snake[0].y * 4 - 300 + speed;
		if(!pauseFlag) {
			camera.position.z += 0.3;
			speed += 1.5
		}
		renderer.render(scene, camera);

		//检测碰撞
		const movingCube = cube[0]
		var originPoint = movingCube.position.clone();
		for (var vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++) {
			// 顶点原始坐标
			var localVertex = movingCube.geometry.vertices[vertexIndex].clone();
			// 顶点经过变换后的坐标
			var globalVertex = localVertex.applyMatrix4(movingCube.matrix);
			var directionVector = globalVertex.sub(movingCube.position);

			var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
			var collisionResults = ray.intersectObjects(collisions);
			if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
				this.gameover('游戏结束！')
				break;
			}
		}
	}

	getMove() {
		let tx = snake[0].x + dir_x[head_for];
		let ty = snake[0].y + dir_y[head_for];
		// if (tx >= 0 && tx < nx && ty >= 0 && ty < ny) {
		// 	if (board[tx][ty] !== 1) {
				if(!pauseFlag){
					the_last_head = head_for;
					snake[len] = {}
					snake[len].x = snake[len - 1].x;
					snake[len].y = snake[len - 1].y;
					cube[len] = this.initCube(12, 12, 12);
					cube[len].position.x = snake[len].x * 10 - start_point_x;
					cube[len].position.y = -snake[len].y * 10 + start_point_y;
					cube[len].castShadow = true;
					scene.add(cube[len]);
					// board[tx][ty] = 1;
					len++;
				}
				// if (board[tx][ty] === 2) {
				// 	this.initFood();
				// }
				for (let i = len - 1; i > 0; i--) {
					snake[i].x = snake[i - 1].x;
					snake[i].y = snake[i - 1].y;
				}
				snake[0].x = tx;
				snake[0].y = ty;
			// }
		// 	else {
		// 		if (the_last_head + head_for !== 3) {
		// 			this.gameover('游戏结束')
		// 		}
		// 		else {
		// 			head_for = the_last_head;
		// 		}
		// 	}
		// } else {
		// 	this.gameover('游戏结束')
		// }
		// for (let i = 0; i < nx; i++) {
		// 	for (let k = 0; k < ny; k++) {
		// 		if (board[i][k] == 1)
		// 			board[i][k] = 0;
		// 	}
		// }
		// for (let i = 0; i < len; i++) {
		// 	board[snake[i].x][snake[i].y] = 1;
		// }
	}

	initFood() {
		const request = new XMLHttpRequest(),
			url = "http://act.cmcmcdn.com/liebao/wechatGame/15.json"
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				let json = JSON.parse(request.responseText)
				let object = threeDep.threeParse(json, url);
				let geometry = object.geometry
				for(let i = 0; i < foodOffests.length; i++) {
					const foodOffest = foodOffests[i]
					food = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: '#f0efa5'}));
					food.scale.x = food.scale.y = food.scale.z = 1200;
					food.translation = geometry.center();
					scene.add(food);
					food.position.x = cube[0].position.x + foodOffest.x;
					food.position.y = cube[0].position.y + foodOffest.y;
					food.position.z = 15;
					food.rotation.x -= 4.7
					// board[tx][ty] = 2;
				}
			}
		};
		request.open('get', url);
		request.send();
	}

	initCube(_s1, _s2, _s3) {
		let geometry = new THREE.BoxGeometry(_s1, _s2, _s3 , 1, 1, 1);
		for (let i = 0; i < geometry.faces.length; i += 2) {
			let hex = '#ffe3ae', hex1 = '#ff9632'
			geometry.faces[i].color.setHex(hex);
			geometry.faces[i + 1].color.setHex(hex1);
		}
		let material = new THREE.MeshLambertMaterial({color: '#ffb463'});
		return new THREE.Mesh(geometry, material);
	}

	initPlane(_size) {  //地板
		let geometry = new THREE.PlaneBufferGeometry(_size, _size, nx, ny);
		let material = new THREE.MeshLambertMaterial({color: '#ffecb4'});
		return new THREE.Mesh(geometry, material);
	}

	initMaterials() {
		const materials = [
			{  //钢琴横条
				url: "http://act.cmcmcdn.com/liebao/wechatGame/1.json",
				material: null,
				blocks: barricades,
				scale: 10
			},
			{  //钢琴粗白块
				url: "http://act.cmcmcdn.com/liebao/wechatGame/6.json",
				material: {color: '#fff'},
				blocks: whiteThickblocks,
				scale: 11
			},
			{  //钢琴中白块
				url: "http://act.cmcmcdn.com/liebao/wechatGame/6.json",
				material: {color: '#fff'},
				blocks: whiteMiddleblocks,
				scale: 11
			},
			{  //钢琴细白块
				url: "http://act.cmcmcdn.com/liebao/wechatGame/6.json",
				material: {color: '#fff'},
				blocks: whiteFineblocks,
				scale: 11
			},
			// {  //食物
			// 	url: "http://act.cmcmcdn.com/liebao/wechatGame/15.json",
			// 	material: {color: '#f0efa5'},
			// 	blocks: foodOffests,
			// 	scale: 1200
			// },
		]
		materials.forEach((material) => {
			this.submitRequest(material)
		})
	}

	submitRequest({url = '', material = null, blocks = [], scale}) {
		const request = new XMLHttpRequest()
		request.open('get', url)
		request.send()
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				const json = JSON.parse(request.responseText),
					object = threeDep.threeParse(json, url),
					geometry = object.geometry,
					materials = material? material : object.materials
				blocks.forEach((block) => {
					const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(materials))
					mesh.scale.x = mesh.scale.y = mesh.scale.z = scale
					mesh.translation = geometry.center()
					mesh.position.set(block.x, block.y, block.z) //z:距离平面高度
					mesh.rotation.set(block.rotationX, block.rotationY, block.rotationZ)
					scene.add(mesh)
					collisions.push(mesh)
				})
			}
		}
	}

	run() {
		this.aRequest = window.requestAnimationFrame(this.run.bind(this), canvas)
		now = Date.now();
		delta = now - then;
		if (delta > interval) {
			then = now - (delta % interval);
			if (!pauseFlag){
				this.getMove()
			}
			this.render();
			gameover && window.cancelAnimationFrame(this.aRequest);
		}
	}

	onTouchStart(event) {
		pauseFlag && (pauseFlag = false)
		clickCount%2===0 && (head_for = 2)
		clickCount%2===1 && (head_for = 3)
		clickCount++
		innerAudioContext.play();
	}

	onWindowResize() {
		let width = window.innerWidth || window.document.body.clientWidth;
		let height = window.innerHeight || window.document.body.clientHeight;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	};

	gameover(title) {
		gameover = true
		wx.showToast({title: title})
		setTimeout(() => {
			// location.reload();
			innerAudioContext.destroy()
		}, 1000)
	}

	initAudio() {
		innerAudioContext = wx.createInnerAudioContext()
		innerAudioContext.src = './asset/piano.mp3';
	}

}

