'use strict'

import '../libs/weapp-adapter'
import { audio, submitRequest, threeParse } from '../utils/index'
import model from '../models/index'
import config from '../config/index'
import { __TWEEN } from '../libs/tween'
import gamepart2 from 'part2/gamepart2'
import Runner from './gamelogic/runner.js'
import Map from './gamelogic/map.js'
import Ball from './gamelogic/ball.js'
import { position } from './gamelogic/position.js'
import threeCamera from '3dcamera'

export default class gameDanceLine {
	vm = {
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
		pauseFlag: true,
		end: false,
		models: [],
		collisionExcepts: ['LEFT_BARRICADE', 'RIGHT_BARRICADE', 'BARRICADE'],
		fps: 60,
		now: '',
		then: Date.now(),
		delta: '',
		getDiamentCount: 0,
		blockAnimateIndex: 0,
		initCubePosition: {},
		initGeometry: {},
		initMaterial: {},
		threeCamera: {},
		ball: new Ball,     //dancing line
		map: new Map,       //地图数据
		runner: new Runner  //游戏运行逻辑
	}
	calval = {
		diamentMesh: null,
		crownMesh: null,
		sortMeshs: null
	}
	gameStatus = {
		part1: true,
		part2: false,
		part3: false
	}
	part2 = {
		part2Cube: [],
		platformStart1: false,
		platformEnd1: false,
		platformStart1Pos: {},
		platformEnd1Pos: {}
	}
	//touch的回调方法
	eventTouchStartFun = this.onTouchStart.bind(null, this)
	//方块常量
	materials = {
		barricade: new THREE.MeshLambertMaterial({color: '#575a52', ambient: '#575a52', lineWidth: 1}),
		block: new THREE.MeshLambertMaterial({color: '#e9e9e9', ambient: '#e9e9e9', lineWidth: 1}),
		cube: new THREE.MeshLambertMaterial({color: '#e7b066', ambient: '#e7b066', lineWidth: 1}),
		diament: new THREE.MeshLambertMaterial({color: '#f9eb4c', ambient: '#f9eb4c', lineWidth: 1}),
		crown: new THREE.MeshLambertMaterial({color: '#f9eb4c', ambient: '#f9eb4c', lineWidth: 1}),
		plane: new THREE.MeshBasicMaterial( {color: '#f6e2b1', ambient: '#f6e2b1', side: THREE.DoubleSide} )
		// plane: new THREE.MeshLambertMaterial({color: '#dfcda0', ambient: '#dfcda0'})
	}
	constructor() {
		//初始化
		this.init()
		//场景运动
		this.run()
		//调整屏幕
		this.onWindowResize()
	}

	init() {
		//渲染
		this.initRender()
		this.vm.scene = new THREE.Scene()
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
		//运动方块
		this.initSnake()
		//初始化开始位置
		//this.setInitCubePosition({x: this.vm.cube[0].position.x, y: this.vm.cube[0].position.y})
		//地板块
		this.initPlane({
			sizeX: 3* 1100,
			sizeY: 3* 1080,
			x: 1100- 580,
			y: 1080- 400,
			z: -12,
		})

		//相机类
		this.vm.threeCamera = new threeCamera()
		// this.vm.scene.add(this.vm.threeCamera.cameraWorker)

		this.initMapData();
		//初始化运行逻辑，必须放到最后面
		this.initRunner();
	}

	initRender() {
		this.vm.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true
		})
		this.vm.renderer.shadowMapEnabled = true
		this.vm.renderer.setClearColor('#f7fce3', 1)
	}

	initCamera() {
		// this.vm.camera = new THREE.PerspectiveCamera(30, 0.5, 1, 12000)
		// this.vm.camera.position.set(-375, -380, 1600);  //3 俯视的高度
		// this.vm.camera.position.set(-4000, -4000, 6550);
		// this.vm.camera.position.set(-3000, -3000, 5550);

		this.vm.camera = new THREE.PerspectiveCamera(40, 0.5, 1, 2000)  //透视相机;far: 加载的范围，与性能有关
		this.vm.camera.position.set(-375, -380, 600)
		this.vm.camera.up.x = 0
		this.vm.camera.up.y = 0
		this.vm.camera.up.z = 1
		this.vm.camera.lookAt(new THREE.Vector3(0, 0, 0))
		// this.vm.camera.lookAt(this.vm.scene.position)
		console.log('this.vm.scene.position', this.vm.scene.position)
	}

	initLight() {
		this.vm.scene.add(new THREE.AmbientLight(0xc9c9c9))
		const directional = new THREE.DirectionalLight(0xc9c9c9, 0.5)
		directional.position.set(-2, 1, 3)
		directional.shadowMapHeight = 2048
		directional.shadowMapWidth = 2048
		this.vm.scene.add(directional)
	}

	initPlane({sizeX, sizeY, x, y, z}) {  //地板
		const geometry = new THREE.PlaneBufferGeometry(sizeX, sizeY, this.vm.nx, this.vm.ny),
			material = this.materials.plane,
			plane = new THREE.Mesh(geometry, material)
		plane.position.set(x, y, z)
		plane.receiveShadow = true
		this.vm.scene.add(plane)
	}

	initMaterials() {
		model.materials.forEach((mate) => {
			let material = {}
			switch (mate.name) {
				case 'LEFT_BARRICADE':
				case 'RIGHT_BARRICADE':
				case 'BARRICADE':
					material = this.materials.barricade; break;
				case 'WHITE_THICK_BLOCKS':
				case 'WHITE_MIDDLE_BLOCKS':
				case 'WHITE_FINE_BLOCKS':
					material = this.materials.block; break;
				case 'DIAMENT':
					material = this.materials.diament; break;
				case 'CROWN':
					material = this.materials.crown; break;
				default:
					material = this.materials.block; break;
			}
			submitRequest({url: mate.url}).then((res) =>{
				if(res) {
					const json = res,
						url = mate.url,
						positions = mate.positions,
						object = threeParse(json, url),
						param = {
							geometry: object.geometry,
							material: material,
							scale: mate.scale,
							name: mate.name,
							opacity: mate.opacity
						}
					if (positions instanceof Array) {
						positions.forEach((position) => {
							param.position = position
							this.initMesh(param)
						})
					} else {
						param.position = positions
						this.initMesh(param)
					}
					//初始化Mesh分类的数组
					this.initCalVals()
				}
			}).catch((err) => {
				console.log('error:', err)
			})
		})
	}

	initAudio() {
		this.vm.innerAudioContext = wx.createInnerAudioContext()
		this.vm.innerAudioContext.src = config.musicSrc
	}

	initMesh({position, geometry, material, scale, name, opacity}) {
		const mesh = new THREE.Mesh(geometry, material)
		mesh.name = name
		// mesh.opacity = opacity
		mesh.scale.x = mesh.scale.y = mesh.scale.z = scale
		mesh.translation = geometry.center()
		mesh.position.set(position.x, position.y, position.z)
		mesh.rotation.set(position.rotationX, position.rotationY, position.rotationZ)
		mesh.animated = false
		mesh.msort = position.msort || 0
		mesh.direction = position.direction || 0
		mesh.updateMatrix()
		this.vm.scene.add(mesh)
		this.vm.models.push(mesh)
	}

	initSnake() {
		const duration = 0.5,
			delay = 1;
		this.vm.ball.setGameScene(this);
		this.vm.ball.createElement();
		//初始方块动画
		this.initSnakeAnimate(this.vm.ball.cube,duration, delay)
	}

	initRunner() {
		//创建球，游戏运行逻辑，地图
		this.vm.runner.setGameScene(this);
		this.vm.runner.setMap(this.vm.map);
		this.createLines();
	}

	initMapData() {
		const jsonStr = JSON.stringify(position);
		this.vm.map.generateFromJson(jsonStr);
	}

	initCalVals() {
		if(this.vm.models.length === 0) return
		this.calval.diamentMesh = this.vm.models.find(model => model.name === 'DIAMENT')
		this.calval.crownMesh = this.vm.models.find(model => model.name === 'CROWN')
		this.calval.sortMeshs = this.vm.models.filter(model => model.msort !== 0)
		this.calval.sortMeshs.sort((a, b) => {
			if(a.msort > b.msort) return 1
			else if(a.msort < b.msort) return -1
		})
	}

	initSnakeAnimate(mesh, duration, delay) {
		new __TWEEN.Tween({scale: 0, rotation: 0, mesh: mesh})
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
				this.mesh.visible = true
			})
			.start()
	}

	initEvents() {
		document.addEventListener('touchstart', this.eventTouchStartFun, false)
	}

	removeEvents() {
		document.removeEventListener('touchstart', this.eventTouchStartFun, false)
	}

	doRender() {
		this.vm.renderer.render(this.vm.scene, this.vm.camera)
	}

	getMove() {
		this.vm.runner.run(this.vm.delta / 1000);
	}

	run() {
		this.vm.aRequest = window.requestAnimationFrame(this.run.bind(this), canvas)
		this.vm.now = Date.now()
		this.vm.delta = this.vm.now - this.vm.then
		if (this.vm.delta > 1000 / this.vm.fps) {
			this.vm.then = this.vm.now - (this.vm.delta % 1000 / this.vm.fps)
			if (!this.vm.pauseFlag){
				this.getMove()
			}
			this.doRender()
			this.animates()
			this.checkGameStatus()
			this.vm.end && window.cancelAnimationFrame(this.vm.aRequest)
			__TWEEN.update()
		}
	}

	changeDiamentPosition(diament) {
		const position = model.diamentOffests[++this.vm.getDiamentCount]
		!position && this.destory(diament)
		position && diament.position.set(position.x, position.y, position.z)
	}

	checkGameStatus () {
		if(this.calval.crownMesh && this.calval.crownMesh && this.vm.ball.cube.position.x >= this.calval.crownMesh.position.x && !this.gameStatus.part2) {
			this.initPart2()
			this.gameStatus.part1 = false
			this.gameStatus.part2 = true
		}
	}

	animates() {
		this.calval.diamentMesh && this.animateDiament(this.calval.diamentMesh, 0.05)
		this.calval.crownMesh && this.animateCrown(this.calval.crownMesh, 0.05)
		!this.vm.pauseFlag && this.calval.sortMeshs && this.calval.sortMeshs.length>0 && this.animateBlocks(this.calval.sortMeshs[this.vm.blockAnimateIndex])
	}

	animateDiament(diament, angle) {
		Object.keys(diament).length>0 && (diament.rotation.y -= angle)
	}

	animateCrown(crown, angle) {
		Object.keys(crown).length>0 && (crown.rotation.y -= angle)
	}

	animateBlocks(block) {
		if(!block) return
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
					this.vm.blockAnimateIndex++
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
					this.vm.blockAnimateIndex++
				}
				block.rotation.z += 0.001* animateSpeed
			}
		}
	}

	setInitCubePosition ({x, y}) {
		this.vm.initCubePosition.x = x
		this.vm.initCubePosition.y = y
	}

	onTouchStart(that, event) {
		if (!that.vm.pauseFlag) {
			that.vm.runner.turn();
		} else {
			that.vm.pauseFlag = false
			audio(1, that.vm.innerAudioContext)
			// that.vm.threeCamera.setTargetRotation(0, that.vm.camera)
		}
	}

	onWindowResize() {
		let width = window.innerWidth || window.document.body.clientWidth,
			height = window.innerHeight || window.document.body.clientHeight
		this.vm.renderer.setSize(width, height)
		this.vm.camera.aspect = width / height
		this.vm.camera.updateProjectionMatrix()
	}

	//第二部分场景
	initPart2() {
		const data = new gamepart2(),
			that = this
		this.part2.part2Cube = data.cubes
		this.part2.platformStart1Pos = data.cubes.find(cube => cube.name && cube.name === 'PLATFORM_START_1')
		this.part2.platformEnd1Pos = data.cubes.find(cube => cube.name && cube.name === 'PLATFORM_END_1')
		data.cubes.forEach(cube => {
			this.vm.scene.add(cube)
			new __TWEEN.Tween({scale: 0, x: cube.x, z: cube.z, mesh: cube})
				.to({
					scale: 1,
					x: cube.x + 85,
					z: cube.z + 800
				}, cube.duration)
				.delay(cube.delay)
				.onUpdate(function() {
					cube.animate === 0 && (this.mesh.position.z = this.z)
					cube.animate === 1 && (this.mesh.position.x = this.x)
					cube.animate === 2 && (this.mesh.scale.z = this.scale)
				})
				.onStart(function () {
					this.mesh.visible = true
				})
				.onComplete(function () {
					cube.animate === 0 && (this.mesh.visible = false)
					cube.animate === 0 && that.vm.scene.remove(this.mesh)
				})
				.start()
		})
	}

	gameover(title) {
		this.vm.end = true
		wx.showToast({
			title: title
		})
		this.removeEvents()
		setTimeout(() => {
			//重启游戏
			this.reset()
		}, 1000)
	}

	destory(mesh) {
		const meshObj = this.vm.scene.getObjectByName(mesh.name)
		mesh && this.vm.scene.remove(meshObj)
	}

	//释放超过的资源
	release() {
		const keeps = 90,
			screenWidth = window.innerWidth/2,
			screenHeight = window.innerHeight/2,
			cubeX = this.vm.cube[0].position.x,
			cubeY = this.vm.cube[0].position.y
		if(cubeX > this.vm.initCubePosition.x + screenWidth && cubeY > this.vm.initCubePosition.y + screenHeight) {
			this.vm.cube.forEach((c, i) => {
				i > keeps && this.destory(this.vm.cube[i])
			})
			this.vm.cube = this.vm.cube.slice(0, keeps)
			this.vm.len = keeps
			this.setInitCubePosition({x: this.vm.cube[0].position.x, y: this.vm.cube[0].position.y})
		}
	}

	reset() {
		new gameDanceLine()
		audio(2, this.vm.innerAudioContext)
	}

	createLines() {
		var material = new THREE.LineBasicMaterial({ color: 0x0000ff });
		var geometry = new THREE.Geometry();
		function Loop(scene, node) {
			for (var i = 0; i < node.links.length; ++i) {
				var geometry = new THREE.Geometry();
				geometry.vertices.push(node.position);
				geometry.vertices.push(node.links[i].position.clone());
				var line = new THREE.Line(geometry, material);
				scene.add(line);
				Loop(scene, node.links[i]);
			}
		}
		Loop(this.vm.scene, this.vm.map.standBlock);
	}

	//interface GameScene for Runner
	startSegment (startpos, direction) {
		this.vm.ball.startSegment(startpos, direction);
		//相机随着线的运动，镜头跟着走
		const offest = 380,
			zAsc = 0.00 //夹角增量
		this.vm.camera.position.x = startpos.x - offest;
		this.vm.camera.position.y = startpos.y - offest;
		!this.vm.pauseFlag && (this.vm.camera.position.z += zAsc);
	}

	doneSegment (startpos, endpos) {
		this.vm.ball.doneSegment(startpos, endpos);
	}

	walkSegment (startpos, endpos) {
		this.vm.ball.walkSegment(startpos, endpos);
		//相机随着线的运动，镜头跟着走
		const offest = 380,
			zAsc = 0.00 //夹角增量
		this.vm.camera.position.x = endpos.x - offest;
		this.vm.camera.position.y = endpos.y - offest;
		// this.vm.camera.lookAt(new THREE.Vector3(0, 0, 0))
		!this.vm.pauseFlag && (this.vm.camera.position.z += zAsc);
	}

	bumpWall(pos) {
		this.gameover("游戏结束");
	}

	getCollisions() {
		const collisions = this.vm.models.filter(model => !~this.vm.collisionExcepts.indexOf(model.name));
		return collisions;
	}

	//interface gameScene for Ball
	getScene() {
		return this.vm.scene;
	}

	getBallMaterial() {

		return this.materials.cube;
	}
}

