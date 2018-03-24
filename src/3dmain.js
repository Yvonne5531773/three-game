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
import { diamentOffests } from '../models/diament/diament'
import threeCamera from '3dcamera'
import GameState from './gamelogic/gamestate.js'

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
		collisionExcepts: ['LEFT_BARRICADE', 'RIGHT_BARRICADE', 'BARRICADE', 'BARRICADE3'],
		floorCollision: ['PLANE1', 'PLANE2', 'LAND'],
		fps: 60,
		now: '',
		then: Date.now(),
		delta: '',
		getDiamentCount: 0,
		blockAnimateIndex: 0,
		initCubePosition: {},
		initGeometry: {},
		initMaterial: {},
		strings: [], // 抖动的线对象集合
		hammers: [],
		threeCamera: {},
		ball: new Ball,     //dancing line
		map: new Map,       //地图数据
		runner: new Runner, //游戏运行逻辑
		
		gameState: new GameState
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
		this.initMaterials(config.loadAction)
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
			name: 'PLANE1'
		})
		this.initPlane({
			sizeX: 2* 1000,
			sizeY: 2* 1000,
			x: 5400 + 1100- 580,
			y: 5500 + 1080- 400,
			z: -32,
			name: 'PLANE2'
		})

		//相机类
		this.vm.threeCamera = new threeCamera()
		// this.vm.scene.add(this.vm.threeCamera.cameraWorker)

		this.initMapData();
		//初始化运行逻辑，必须放到最后面
		this.initRunner();

		// this.initPart2()
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
		// this.vm.camera = new THREE.PerspectiveCamera(15, 0.5, 1, 12000)
		// this.vm.camera.position.set(-375, -380, 1600);  //3 俯视的高度
		// this.vm.camera.position.set(-3400, -3400, 6550);
		// this.vm.camera.position.set(-800, -800, 5550);
		// this.vm.camera.position.set(-6400, -6400, 6550);

		this.vm.camera = new THREE.PerspectiveCamera(40, 0.5, 1, 2000)  //透视相机;far: 加载的范围，与性能有关
		this.vm.camera.position.set(-375, -380, 600)
		this.vm.camera.up.x = 0
		this.vm.camera.up.y = 0
		this.vm.camera.up.z = 1
		this.vm.camera.lookAt(this.vm.scene.position)

		// 测试代码
		// this.vm.camera.lookAt(new THREE.Vector3(-375, -380, 0))
		// this.vm.camera.position.set(1900, 1700, 1200);  //3 俯视的高度
		// this.vm.camera.position.set(2300, 2500, 1200);  //3 俯视的高度
		// this.vm.camera.lookAt(new THREE.Vector3(0, 0, 0))
	}

	initLight() {
		this.vm.scene.add(new THREE.AmbientLight(0xc9c9c9))
		const directional = new THREE.DirectionalLight(0xc9c9c9, 0.5)
		directional.position.set(-2, 1, 3)
		directional.shadowMapHeight = 2048
		directional.shadowMapWidth = 2048
		this.vm.scene.add(directional)
	}

	initPlane({sizeX, sizeY, x, y, z, name}) {  //地板
		const geometry = new THREE.PlaneBufferGeometry(sizeX, sizeY, this.vm.nx, this.vm.ny),
			material = this.materials.plane,
			plane = new THREE.Mesh(geometry, material)
		plane.position.set(x, y, z)
		plane.receiveShadow = true
		plane.name = name
		this.vm.scene.add(plane)
		this.vm.models.push(plane);
	}

	initMaterials(action) {
		const constructJSON = (json, material, mate) => {
			if(!json) return
			const url = mate.url,
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
		model.materials.forEach((mate) => {
			let material = {}
			switch (mate.name) {
				case 'LEFT_BARRICADE':
				case 'RIGHT_BARRICADE':
				case 'BARRICADE':
				case 'BARRICADE3':
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
			if(action === 1) {
				submitRequest({url: mate.url}).then((res) =>{
					if(res) {
						constructJSON(res, material, mate)
					}
				}).catch((err) => {
					console.log('error:', err)
				})
			} else if(action === 2) {
				constructJSON(mate.json, material, mate)
			}
		})
	}

	initAudio() {
		this.vm.innerAudioContext = wx.createInnerAudioContext()
		// this.vm.innerAudioContext.src = '../asset/piano.mp3'
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
		mesh.animated = position.animt===1
		mesh.duration = position.duration
		mesh.delay = position.delay
		mesh.direction = position.direction || 0
		mesh.updateMatrix()
		this.vm.scene.add(mesh)
		this.vm.models.push(mesh)
	}

	initSnake() {
		this.vm.ball.setGameScene(this);
		this.vm.ball.createElement();
		
		const duration = 0.5, delay = 1;
		//初始方块动画
		this.initSnakeAnimate(this.vm.ball.cube,duration, delay);
	}

	initRunner() {
		//创建球，游戏运行逻辑，地图
		this.vm.runner.setGameScene(this);
		this.vm.runner.setMap(this.vm.map);
		//this.createLines();
	}

	initMapData() {
		const jsonStr = JSON.stringify(position);
		this.vm.map.generateFromJson(jsonStr);
	}

	initCalVals() {
		if(this.vm.models.length === 0) return
		if(!this.calval.diamentMesh || this.calval.diamentMesh.length === 0) {
			this.calval.diamentMesh = this.vm.models.filter(model => model.name === 'DIAMENT')
			this.calval.diamentMesh.forEach((d, i) => {
				d.name = 'DIAMENT_' + i
			})
		}
		this.calval.crownMesh = this.vm.models.find(model => model.name === 'CROWN')
		this.calval.sortMeshs = this.vm.models.filter(model => model.animated)
	}

	initSnakeAnimate(mesh, duration, delay) {
		var game = this;
		
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
			.onComplete(function () {
				game.vm.gameState.Ready();
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
		
		//var now = Date.now()
		this.vm.runner.run(this.vm.delta / 1000);
		//console.log(Date.now() - now);
	}

	run() {
		this.vm.aRequest = window.requestAnimationFrame(this.run.bind(this), canvas)
		this.vm.now = Date.now()
		this.vm.delta = this.vm.now - this.vm.then
		if (this.vm.delta > 1000 / this.vm.fps) {
			this.vm.then = this.vm.now - (this.vm.delta % 1000 / this.vm.fps)
			
			if (this.vm.gameState.IsStart()){
				this.getMove()
			}
			
			this.doRender()
			this.animates()
			this.checkGameStatus()
			this.vm.end && window.cancelAnimationFrame(this.vm.aRequest)
			__TWEEN.update()
		}
	}

	checkGameStatus () {
		if(this.calval.crownMesh && this.calval.crownMesh && this.vm.ball.cube.position.x >= this.calval.crownMesh.position.x && !this.gameStatus.part2) {
			this.initPart2()
			this.gameStatus.part1 = false
			this.gameStatus.part2 = true
		}
	}

	animateDiament(diament, angle) {
		Object.keys(diament).length>0 && (diament.rotation.y -= angle)
	}

	animateCrown(crown, angle) {
		Object.keys(crown).length>0 && (crown.rotation.y -= angle)
	}

	animateBlocks(block) {
		if(!block || !block.animated) return
		const rotationZ = block.direction===1
			? -0.01* Math.PI : 0.01* Math.PI
		const tween = new __TWEEN.Tween({rotationZ: 0, mesh: block})
			.to({
				rotationZ: rotationZ
			}, block.duration/2)
			.easing(__TWEEN.Easing.Linear.None)
			.delay(block.delay)
			.onUpdate(function() {
				this.mesh.rotation.z = this.rotationZ
			})
		const tweenBack = new __TWEEN.Tween({rotationZ: rotationZ, mesh: block})
			.to({
				rotationZ: 0
			}, block.duration/2)
			.easing(__TWEEN.Easing.Linear.None)
			.onUpdate(function() {
				this.mesh.rotation.z = this.rotationZ
			})
		tween.chain(tweenBack)
		tween.start().onComplete(function() {
			block.animated = false
		})
	}

	setInitCubePosition ({x, y}) {
		this.vm.initCubePosition.x = x
		this.vm.initCubePosition.y = y
	}
	
	startGame() {
		this.vm.gameState.StartGame();
	}

	onTouchStart(that, event) {
		if (!that.vm.gameState.IsReady()) {
			return ;
		}
		
		if (that.vm.gameState.IsStart()) {
			that.vm.runner.turn()
		} else {
			that.startGame();
			
			audio(1, that.vm.innerAudioContext);
			// that.vm.threeCamera.setTargetRotation(0, that.vm.camera)
			that.calval.sortMeshs.forEach( mesh => {
				that.animateBlocks(mesh)
			})
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
			this.vm.models.push(cube)
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

		this.strings = data.strings;
		data.strings.forEach(strObj => {
			this.vm.scene.add(strObj.mesh)
		})

		this.hammers = data.hammers;
		data.hammers.forEach(hammerObj => {
			this.vm.scene.add(hammerObj.mesh)
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

	animates() {
		this.calval.diamentMesh.forEach(diament => {
			this.animateDiament(diament, 0.05)
		})
		// this.calval.diamentMesh && this.animateDiament(this.calval.diamentMesh, 0.05)
		this.calval.crownMesh && this.animateCrown(this.calval.crownMesh, 0.05)

		if (this.gameStatus.part2) {

			let cursorNum = +this.vm.runner.cursor_.name;

			// 抖动的线动画
			this.strings.forEach(strObj => {
				strObj.anim()
			})

			// 钢琴锤子动画
			if (cursorNum > 41) {
				this.hammers[0].anim();
			}

			if (cursorNum > 46) {
				this.hammers[1].anim();
			}
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
	startSegment (startpos, direction, corner) {

		this.vm.ball.startSegment(startpos, direction, corner);

		//相机随着线的运动，镜头跟着走
		const offest = 380,
			zAsc = 0.00 //夹角增量
		this.vm.camera.position.x = startpos.x - offest;
		this.vm.camera.position.y = startpos.y - offest;
		//this.vm.gameState.IsRunning() && (this.vm.camera.position.z += zAsc);
	}

	doneSegment (startpos, endpos) {
		this.vm.ball.doneSegment(startpos, endpos);

	}

	walkSegment (startpos, endpos, droped) {

		this.vm.ball.walkSegment(startpos, endpos, droped);

		//相机随着线的运动，镜头跟着走
		const offest = 380,
			zAsc = 0.00 //夹角增量
		this.vm.camera.position.x = endpos.x - offest;
		this.vm.camera.position.y = endpos.y - offest;
		// this.vm.camera.lookAt(new THREE.Vector3(0, 0, 0))
		//!this.vm.pauseFlag && (this.vm.camera.position.z += zAsc);
	}

	bumpWall(pos) {
		this.gameover("游戏结束");
	}

	flyOut(pos) {

		this.gameover("游戏结束");

	}

	hitDiamond(mesh) {
		if (mesh) {
			this.destory(mesh)
		}
	}

	attainCrown(mesh) {

		if (mesh) {
			mesh.visible = false;
		}

	}

	passNode(pos, name) {


		if (name === "destination") {
			//this.gameover("恭喜过关");
			this.vm.runner.passMission();
		}

	}

	getCollisions(type) {
		if (type === 1) {
			const collisions = this.vm.models.filter(model => !~this.vm.collisionExcepts.indexOf(model.name));
			return collisions;
		} else if (type === 2) {
			const collisions = this.vm.models.filter(model => ~this.vm.floorCollision.indexOf(model.name));
			return collisions;
		}

		return null;
	}

	//interface gameScene for Ball
	getScene() {
		return this.vm.scene;
	}

	getBallMaterial() {

		return this.materials.cube;
	}
}

