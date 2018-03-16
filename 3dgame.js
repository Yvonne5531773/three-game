'use strict'

import './libs/weapp-adapter'
import threeDep from './parse'
import { barricades } from './positions/barricades'
import { foodOffests } from './positions/foodoffest'
import { whiteThickblocks } from './positions/thickblock'
import { whiteMiddleblocks } from './positions/middleblock'
import { whiteFineblocks } from './positions/fineblock'
const THREE = require('libs/three.min')

const vm = {
	innerAudioContext: {},
	scene: {},
	renderer: {},
	camera: {},
	cube: [],
	len: 1,
	nx: 40,       //范围宽
	ny: 40,       //范围高
	snake: [],
	snakeVolumn: 14,
	startX: 200,
	startY: 190,
	headX: 7,   //开始X
	headY: 30,  //开始Y
	headForward: 2,     //方向
	pauseFlag: true,
	directionX: [0, -1, 1, 0],
	directionY: [1, 0, 0, -1],
	clickCount: 0,
	end: false,
	collisions: [],
	speed: 4,
	fps: 60,
	now: '',
	then: Date.now(),
	delta: '',
	getFoodCount: 0,
}

let plane, planeSize = 400 //地板范围

export default class gameDanceLine {
	aRequest = {}
	musicSrc = './asset/piano.mp3'
	constructor() {
		this.init()
	}

	init() {
		vm.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});
		vm.renderer.shadowMapEnabled = true;
		vm.renderer.setClearColor('#f0edc8', 1);

		vm.scene = new THREE.Scene();

		//初始化素材
		this.initMaterials()
		//音乐
		this.initAudio()
		//相机
		this.initCamera()
		//灯源
		this.initLight()

		plane = this.initPlane(planeSize);
		plane.position.set(-5, -5, -5);
		plane.receiveShadow = true;
		// vm.scene.add(plane);

		for (let i = 0; i < vm.len; i++) {
			vm.snake[i] = {}
			vm.snake[i].x = vm.headX + i * vm.directionX[3 - vm.headForward];
			vm.snake[i].y = vm.headY + i * vm.directionY[3 - vm.headForward];
			vm.cube[i] = this.initCube(vm.snakeVolumn, vm.snakeVolumn, vm.snakeVolumn);
			vm.cube[i].position.x = vm.snake[i].x * vm.speed - vm.startX;
			vm.cube[i].position.y = -vm.snake[i].y * vm.speed + vm.startY;
			vm.cube[i].castShadow = true;
			vm.scene.add(vm.cube[i]);
		}

		this.run();

		document.addEventListener('touchstart', this.onTouchStart, false);
		document.addEventListener('resize', this.onWindowResize, false);
		this.onWindowResize()
	}

	render() {
		//递增的位置
		const speed = 5
		for (let i = 0; i < vm.len; ++i) {
			vm.cube[i].position.x = vm.snake[i].x * vm.speed - vm.startX;
			vm.cube[i].position.y = -vm.snake[i].y * vm.speed + vm.startY;
			vm.cube[i].position.z = 12;
		}
		//随着线的运动，镜头跟着走
		const offest = 350, zAsc = 0.01
		vm.camera.position.x = vm.cube[0].position.x - offest
		vm.camera.position.y = vm.cube[0].position.y - offest
		vm.camera.position.z += zAsc
		vm.renderer.render(vm.scene, vm.camera);

		//检测碰撞
		const movingCube = vm.cube[0]
		var originPoint = movingCube.position.clone();
		for (var vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++) {
			// 顶点原始坐标
			var localVertex = movingCube.geometry.vertices[vertexIndex].clone();
			// 顶点经过变换后的坐标
			var globalVertex = localVertex.applyMatrix4(movingCube.matrix);
			var directionVector = globalVertex.sub(movingCube.position);

			var ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
			var collisionResults = ray.intersectObjects(vm.collisions);
			if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
				if(collisionResults[0].object.name === 'FOOD') {
					this.changeFoodPosition(collisionResults[0].object)
				} else {
					this.gameover('游戏结束！')
					break;
				}
			}
		}
	}

	getMove() {
		let tx = vm.snake[0].x + vm.directionX[vm.headForward];
		let ty = vm.snake[0].y + vm.directionY[vm.headForward];
		if(!vm.pauseFlag){
			vm.snake[vm.len] = {}
			vm.snake[vm.len].x = vm.snake[vm.len - 1].x;
			vm.snake[vm.len].y = vm.snake[vm.len - 1].y;
			vm.cube[vm.len] = this.initCube(vm.snakeVolumn, vm.snakeVolumn, vm.snakeVolumn);
			vm.scene.add(vm.cube[vm.len]);
			vm.len++;
		}
		for (let i = vm.len - 1; i > 0; i--) {
			vm.snake[i].x = vm.snake[i - 1].x;
			vm.snake[i].y = vm.snake[i - 1].y;
		}
		vm.snake[0].x = tx;
		vm.snake[0].y = ty;
	}

	initCamera() {
		vm.camera = new THREE.PerspectiveCamera(50, 0.5, 1, 10000);
		// vm.camera.position.set(-250, -480, 1450);  //3参数越小，离表面越近 //俯视的高度
		vm.camera.position.set(-480, -450, 550);
		vm.camera.up.x = 0;
		vm.camera.up.y = 0;
		vm.camera.up.z = 1;
		vm.camera.lookAt({x: -30, y: 0, z: -100})  //z: 视觉高度
		// vm.camera.lookAt({x: 250, y: 0, z: -200})
	}

	initLight() {
		const light = new THREE.DirectionalLight('#fff', 1);
		light.position.set(-10, -6, -6);  //光源方向
		vm.scene.add(light);
		const directionalLight = new THREE.DirectionalLight("#fff");
		directionalLight.position.set(0, 0, 1);
		vm.scene.add(directionalLight);
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
		let geometry = new THREE.PlaneBufferGeometry(_size, _size, vm.nx, vm.ny);
		let material = new THREE.MeshLambertMaterial({color: '#ffecb4'});
		return new THREE.Mesh(geometry, material);
	}

	initMaterials() {
		const materials = [
			{  //钢琴横条
				name: 'BARRICADE',
				url: "http://act.cmcmcdn.com/liebao/wechatGame/1.json",
				material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
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
				url: "http://act.cmcmcdn.com/liebao/wechatGame/10.json",
				material: {color: '#fff'},
				blocks: whiteMiddleblocks,
				scale: 11
			},
			{  //钢琴细白块
				url: "http://act.cmcmcdn.com/liebao/wechatGame/7.json",
				material: {color: '#fff'},
				blocks: whiteFineblocks,
				scale: 11
			},
			{  //食物
				url: "http://act.cmcmcdn.com/liebao/wechatGame/15.json",
				material: {color: '#f0efa5'},
				blocks: foodOffests[0],
				scale: 1200,
				name: 'FOOD'
			},
		]
		materials.forEach((material) => {
			this.submitRequest(material)
		})
	}

	initAudio() {
		vm.innerAudioContext = wx.createInnerAudioContext()
		vm.innerAudioContext.src = this.musicSrc;
	}

	initMesh(block, geometry, material, scale, name, opacity) {
		const mesh = new THREE.Mesh(geometry, material)
		mesh.name = name
		// mesh.opacity = opacity
		mesh.scale.x = mesh.scale.y = mesh.scale.z = scale
		mesh.translation = geometry.center()
		//物体速度变化，要调整相应的路障位置，x越大，越左；y越大，越上
		mesh.position.set(block.x - 8*vm.speed, block.y + 42*vm.speed, block.z) //z:距离平面高度
		mesh.rotation.set(block.rotationX, block.rotationY, block.rotationZ)
		vm.scene.add(mesh)
		vm.collisions.push(mesh)
	}

	submitRequest({url = '', material = null, blocks = [], scale = '', name = '', opacity = 1}) {
		const that = this
		const request = new XMLHttpRequest()
		request.open('get', url)
		request.send()
		request.onreadystatechange = function () {
			if (request.readyState === 4) {
				const json = JSON.parse(request.responseText),
					object = threeDep.threeParse(json, url),
					geometry = object.geometry,
					materials = material? material : object.materials
				if(blocks instanceof Array) {
					blocks.forEach((block) => {
						that.initMesh(block, geometry, new THREE.MeshLambertMaterial(materials), scale, name, opacity)
					})
				} else {
					that.initMesh(blocks, geometry, new THREE.MeshLambertMaterial(materials), scale, name, opacity)
				}
			}
		}
	}

	run() {
		this.aRequest = window.requestAnimationFrame(this.run.bind(this), canvas)
		// vm.now = Date.now();
		// vm.delta = vm.now - vm.then;
		// if (vm.delta > 1000 / vm.fps) {
		// 	vm.then = vm.now - (vm.delta % 1000 / vm.fps);
		// 	if (!vm.pauseFlag){
		// 		this.getMove()
		// 	}
		// }
		if (!vm.pauseFlag){
			this.getMove()
		}
		this.render();
		vm.end && window.cancelAnimationFrame(this.aRequest);
	}

	onTouchStart(event) {
		vm.pauseFlag && (vm.pauseFlag = false)
		vm.clickCount===0 && vm.innerAudioContext.play();
		vm.clickCount%2===0 && (vm.headForward = 2)
		vm.clickCount%2===1 && (vm.headForward = 3)
		vm.clickCount++
	}

	changeFoodPosition(food) {
		const position = foodOffests[++vm.getFoodCount]
		!position && this.destoryFood(food)
		position && food.position.set(position.x, position.y, position.z)
	}

	onWindowResize() {
		let width = window.innerWidth || window.document.body.clientWidth;
		let height = window.innerHeight || window.document.body.clientHeight;
		vm.renderer.setSize(width, height);
		vm.camera.aspect = width / height;
		vm.camera.updateProjectionMatrix();
	};

	gameover(title) {
		vm.end = true
		wx.showToast({title: title})
		setTimeout(() => {
			// location.reload()
			vm.innerAudioContext.destroy()
		}, 1000)
	}

	destoryFood(food) {
		food.position.set(0, 0, 0)
	}

}

