'use strict'

import '../libs/weapp-adapter'
import { audio } from '../utils/index'
import threeDep from '../utils/parse'
import model from '../models/index'
import config from '../config/index'
import { __TWEEN } from '../libs/tween'
const THREE = require('../libs/three.min')

const vm = {
	innerAudioContext: {},
	scene: {},
	renderer: {},
	camera: {},
	aRequest: {},
	cube: [],
	len: 1,
	nx: 40,                     //范围宽
	ny: 40,                     //范围高
	snake: [],
	snakeVolumn: 14,
	startX: 200,
	startY: 190,
	headX: 2,                   //开始X
	headY: 30,                  //开始Y
	headForward: 2,             //方向
	pauseFlag: true,
	directionX: [0, -1, 1, 0],
	directionY: [1, 0, 0, -1],
	clickCount: 0,
	end: false,
	models: [],
	snakeSpeed: 4,
	fps: 60,
	now: '',
	then: Date.now(),
	delta: '',
	getFoodCount: 0,
	blockAnimateIndex: 0
}

const calval = {
	foodMesh: {},
	sortMeshs: []
}

let plane, planeSize = 400 //地板范围

export default class gameDanceLine {
	constructor() {
		this.init()
	}

	init() {
		//渲染
		this.initRender()
		vm.scene = new THREE.Scene();
		//素材
		this.initMaterials()
		//音乐
		this.initAudio()
		//相机
		this.initCamera()
		//灯源
		this.initLight()
		//事件
		this.initEvents()

		console.log('window.innerWidth',window.innerWidth)
		console.log('window.innerHeight',window.innerHeight)
		//板块
		plane = this.initPlane(planeSize);
		plane.position.set(-5, -5, -5);
		plane.receiveShadow = true;
		// vm.scene.add(plane);

		this.initSnake()

		this.run()

		//调整屏幕
		this.onWindowResize()
	}

	initRender() {
		vm.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		});
		vm.renderer.shadowMapEnabled = true;
		vm.renderer.setClearColor('#f0edc8', 1);
	}

	initCamera() {
		vm.camera = new THREE.PerspectiveCamera(40, 0.5, 1, 10000);
		vm.camera.position.set(-480, -450, 2150);  //3参数越小，离表面越近 //俯视的高度
		// vm.camera.position.set(-480, -450, 680);
		vm.camera.up.x = 0;
		vm.camera.up.y = 0;
		vm.camera.up.z = 1;
		vm.camera.lookAt({x: 830, y: 800, z: -100})
		// vm.camera.lookAt({x: -30, y: 0, z: -100})  //z: 视觉高度
	}

	initLight() {
		const light = new THREE.DirectionalLight('#fff', 1);
		light.position.set(-10, -6, -6);  //光源方向
		vm.scene.add(light);
		const directionalLight = new THREE.DirectionalLight("#fff");
		directionalLight.position.set(0, 0, 1);
		directionalLight.shadowMapHeight = 2048;
		directionalLight.shadowMapWidth = 2048;
		vm.scene.add(directionalLight);
	}

	initCube(_s1, _s2, _s3) {
		const hex = ['#ffe3ae', '#ff9632'],
			geometry = new THREE.BoxGeometry(_s1, _s2, _s3, 1, 1, 1);
		for (let i = 0; i < geometry.faces.length; i += 2) {
			geometry.faces[i].color.setHex(hex[0])
			geometry.faces[i + 1].color.setHex(hex[1])
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
		model.materials.forEach((material) => {
			this.submitRequest(material)
		})
	}

	initAudio() {
		vm.innerAudioContext = wx.createInnerAudioContext()
		vm.innerAudioContext.src = config.musicSrc;
	}

	initMesh(block, geometry, material, scale, name, opacity) {
		const mesh = new THREE.Mesh(geometry, material)
		mesh.name = name
		// mesh.opacity = opacity
		mesh.scale.x = mesh.scale.y = mesh.scale.z = scale
		mesh.translation = geometry.center()
		//物体速度变化，要调整相应的路障位置，x越大，越左；y越大，越上
		mesh.position.set(block.x - 8 * vm.snakeSpeed, block.y + 42 * vm.snakeSpeed, block.z) //z:距离平面高度
		mesh.rotation.set(block.rotationX, block.rotationY, block.rotationZ)
		mesh.animated = false
		mesh.msort = block.msort || 0
		mesh.direction = block.direction || 0
		vm.scene.add(mesh)
		vm.models.push(mesh)
		//初始化计算的Mesh
		calval.foodMesh = vm.models.find(model => model.name === 'FOOD')
		calval.sortMeshs = vm.models.filter(model => model.msort !== 0)
		calval.sortMeshs.sort((a, b) => {
			if(a.msort > b.msort) return 1
			else if(a.msort < b.msort) return -1
		})
	}

	initSnake() {
		if(!vm.len) return
		const duration = 0.5,
			delay = 0.5
		for (let i = 0; i < vm.len; i++) {
			vm.snake[i] = {}
			vm.snake[i].x = vm.headX + i * vm.directionX[3 - vm.headForward]
			vm.snake[i].y = vm.headY + i * vm.directionY[3 - vm.headForward]
			vm.cube[i] = this.initCube(vm.snakeVolumn, vm.snakeVolumn, vm.snakeVolumn/1.3)
			vm.cube[i].position.x = vm.snake[i].x * vm.snakeSpeed - vm.startX
			vm.cube[i].position.y = -vm.snake[i].y * vm.snakeSpeed + vm.startY
			vm.cube[i].castShadow = true
			vm.cube[i].visible = false
			vm.scene.add(vm.cube[i])
			new __TWEEN.Tween({scale: 0, rotation: 0, mesh: vm.cube[0]})
				.to({
					scale: 1,
					rotation: 0.5* Math.PI
				}, duration)
				.delay(delay)
				.onUpdate(function() {
					this.mesh.scale.z = this.scale
					this.mesh.rotation.z = this.rotation
				})
				.onStart(function () {
					this.mesh.visible = true;
				})
				.start()
		}
	}

	initEvents() {
		document.addEventListener('touchstart', this.onTouchStart, false);
		document.addEventListener('resize', this.onWindowResize, false);
	}

	destoryEvents() {
		document.removeEventListener('touchstart', this.onTouchStart, false);
		document.removeEventListener('resize', this.onWindowResize, false);
	}

	render() {
		//运动的位置随速度变化
		for (let i = 0; i < vm.len; ++i) {
			vm.cube[i].position.x = vm.snake[i].x * vm.snakeSpeed - vm.startX;
			vm.cube[i].position.y = -vm.snake[i].y * vm.snakeSpeed + vm.startY;
			vm.cube[i].position.z = 12;
		}
		//相机随着线的运动，镜头跟着走
		const offest = 400,
			zAsc = 0.08 //夹角增量
		vm.camera.position.x = vm.cube[0].position.x - offest
		vm.camera.position.y = vm.cube[0].position.y - offest
		!vm.pauseFlag && (vm.camera.position.z += zAsc)
		vm.renderer.render(vm.scene, vm.camera);
	}

	getMove() {
		let tx = vm.snake[0].x + vm.directionX[vm.headForward];
		let ty = vm.snake[0].y + vm.directionY[vm.headForward];
		if (!vm.pauseFlag) {
			vm.snake[vm.len] = {}
			vm.snake[vm.len].x = vm.snake[vm.len - 1].x;
			vm.snake[vm.len].y = vm.snake[vm.len - 1].y;
			vm.cube[vm.len] = this.initCube(vm.snakeVolumn, vm.snakeVolumn, vm.snakeVolumn/1.3);
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

	run() {
		vm.aRequest = window.requestAnimationFrame(this.run.bind(this), canvas)
		// vm.now = Date.now();
		// vm.delta = vm.now - vm.then;
		// if (vm.delta > 1000 / vm.fps) {
		// 	vm.then = vm.now - (vm.delta % 1000 / vm.fps);
		// 	if (!vm.pauseFlag){
		// 		this.getMove()
		// 	}
		// 	this.render();
		// }
		if (!vm.pauseFlag) {
			this.getMove()
			this.checkCollision()
		}
		this.render()
		this.animates()
		vm.end && window.cancelAnimationFrame(vm.aRequest)
		__TWEEN.update()
	}

	changeFoodPosition(food) {
		const position = model.foodOffests[++vm.getFoodCount]
		!position && this.destoryFood(food)
		position && food.position.set(position.x, position.y, position.z)
	}

	checkCollision() {
		const movingCube = vm.cube[0]
		let originPoint = movingCube.position.clone();
		for (let vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++) {
			// 顶点原始坐标
			let localVertex = movingCube.geometry.vertices[vertexIndex].clone();
			// 顶点经过变换后的坐标
			let globalVertex = localVertex.applyMatrix4(movingCube.matrix);
			let directionVector = globalVertex.sub(movingCube.position);
			let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize());
			let collisionResults = ray.intersectObjects(vm.models);
			if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
				if (collisionResults[0].object.name === 'FOOD') {
					this.changeFoodPosition(collisionResults[0].object)
				} else {
					this.gameover('游戏结束！')
					break
				}
			}
		}
	}

	gameover(title) {
		vm.end = true
		wx.showToast({
			title: title
		})
		this.destoryEvents()
		setTimeout(() => {
			// location.reload()
			audio(2, vm.innerAudioContext)
		}, 1000)
	}

	animates() {
		calval.foodMesh && this.animateFood(calval.foodMesh)
		!vm.pauseFlag && calval.sortMeshs && calval.sortMeshs.length>0 && this.animateBlocks(calval.sortMeshs[vm.blockAnimateIndex])
	}

	animateFood(food) {
		Object.keys(food).length>0 && (food.rotation.y += 0.01)
	}

	//销毁mesh对象
	destoryFood(food) {
		const foodObj = vm.scene.getObjectByName(food.name);
		food && vm.scene.remove(foodObj)
	}

	animateBlocks(block) {
		if(!block) return
		// console.log('block1', block)
		const rotate = 0.01,
			animateSpeed = 3
		if(block.direction === 0) {  //左边块
			if(!block.animated && block.rotation.z >= rotate*Math.PI) {
				block.animated = true
			} else if (!block.animated) {
				block.rotation.z += 0.002
			} else if (block.animated && block.rotation.z >= 0) {
				if(block.rotation.z < 0.001* animateSpeed) {  //回到原位
					block.animated = false
					vm.blockAnimateIndex++
				}
				block.rotation.z -= 0.001* animateSpeed
			}
		} else if (block.direction === 1) {  //右边块
			if(!block.animated && block.rotation.z <= -rotate*Math.PI) {
				block.animated = true
			} else if (!block.animated) {
				block.rotation.z -= 0.002
			} else if (block.animated && block.rotation.z <= 0) {
				if(block.rotation.z > -0.001* animateSpeed) {
					block.animated = false
					vm.blockAnimateIndex++
				}
				block.rotation.z += 0.001* animateSpeed
			}
		}
	}

	onTouchStart(event) {
		vm.pauseFlag && (vm.pauseFlag = false)
		vm.clickCount === 0 && audio(1, vm.innerAudioContext)
		vm.clickCount % 2 === 0 && (vm.headForward = 2)
		vm.clickCount % 2 === 1 && (vm.headForward = 3)
		vm.clickCount++
	}

	onWindowResize() {
		let width = window.innerWidth || window.document.body.clientWidth;
		let height = window.innerHeight || window.document.body.clientHeight;
		vm.renderer.setSize(width, height);
		vm.camera.aspect = width / height;
		vm.camera.updateProjectionMatrix();
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
					materials = material ? material : object.materials
				if (blocks instanceof Array) {
					blocks.forEach((block) => {
						that.initMesh(block, geometry, new THREE.MeshLambertMaterial(materials), scale, name, opacity)
					})
				} else {
					that.initMesh(blocks, geometry, new THREE.MeshLambertMaterial(materials), scale, name, opacity)
				}
			}
		}
	}

}

