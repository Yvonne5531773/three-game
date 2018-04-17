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
import { position, groceryStr} from './gamelogic/position.js'
import { diamentOffests } from '../models/diament/diament'
import { crownOffests } from '../models/crown/crown'
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
		pauseFlag: true,
		end: false,
		models: [],
		wallCollision: ['WHITE_FINE_BLOCKS', 'WHITE_MIDDLE_BLOCKS', 'WHITE_THICK_BLOCKS'],
		floorCollision: ['PLANE1', 'PLANE2', 'LAND'],
		fps: 60,
		now: '',
		then: Date.now(),
		delta: '',
		getDiamentCount: 0,
		getCrownCount: 0,
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
		pianoKeys: [],
		right: [],
		left: [],
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

	loader = new THREE.OBJLoader( new THREE.LoadingManager() );

	//touch的回调方法
	eventTouchStartFun = this.onTouchStart.bind(null, this)
	//方块常量
	materials = {
		barricade: new THREE.MeshLambertMaterial({color: '#575a52'}),
		block: new THREE.MeshLambertMaterial({color: '#e9e9e9'}),
		cube: new THREE.MeshLambertMaterial({color: '#e7b066'}),
		diament: new THREE.MeshLambertMaterial({color: '#f9eb4c'}),
		crown: new THREE.MeshLambertMaterial({color: '#f9eb4c'}),
		plane: new THREE.MeshBasicMaterial( {color: '#f6e2b1', side: THREE.DoubleSide} )
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
		// this.initMaterials(config.loadAction)
		//音乐
		this.initAudio()
		//相机
		this.initCamera()
		//灯源
		this.initLight()
		//事件
		this.initEvents()
		//运动方块
		this.initBall()
		//初始化开始位置
		//this.setInitCubePosition({x: this.vm.cube[0].position.x, y: this.vm.cube[0].position.y})
		//地板块
		// this.initPlane({
		// 	sizeX: 3* 1100,
		// 	sizeY: 3* 1080,
		// 	x: 1100- 650,
		// 	y: 1080- 400,
		// 	z: -52,
		// 	name: 'PLANE1'
		// })
		this.initPlane({
			sizeX: 2* 1000,
			sizeY: 2* 1000,
			x: 6170,
			y: 6310,
			z: -50,
			name: 'PLANE2'
		})

		//相机类
		// this.vm.threeCamera = new threeCamera()
		//camera辅助线
		// this.vm.scene.add(this.vm.threeCamera.cameraWorker)

		this.initMapData();
		//初始化运行逻辑，必须放到最后面
		this.initRunner();

		// this.initPart2()
		const that = this
		this.loader.load('http://act.cmcmcdn.com/liebao/wechatGame/danceline/123.obj', function ( object ) {
			object.scale.x = object.scale.y = object.scale.z = 18
			object.position.x = 0;
			object.position.y = 0;
			object.position.z = -600;
			object.rotation.y = -Math.PI
			that.vm.pianoKeys = object.children.filter(function(o) {
				return !!~o.name.indexOf('PianoKey')
			} )
			that.vm.pianoKeys.forEach((key => {
				key.material = that.materials.block
			}))
			that.vm.right = object.children.filter(function(o) {
				return !!~o.name.indexOf('Right')
			} )
			that.vm.left = object.children.filter(function(o) {
				return !!~o.name.indexOf('left')
			} )
			const hars = object.children.filter(function(o) {
				return !!~o.name.indexOf('HaracterTail_ncl1_62')
			} )
			hars.forEach(h => {
				h.material = that.materials.cube
			})
			console.log('object', object)
			console.log('hars', hars)
			that.vm.ball.cube = hars[0]
			hars[0].visible = false
			that.vm.right[0].material = that.materials.barricade
			that.vm.left[0].material = that.materials.barricade

			that.vm.scene.add(object);
		}, this.onProgress, this.onError );
	}
	onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	}
	onError = function ( xhr ) {
	}

	initRender() {
		this.vm.renderer = new THREE.WebGLRenderer({
			canvas: canvas,
			antialias: true  //微信默认都是false
		})
		this.vm.renderer.setPixelRatio(window.devicePixelRatio) //设备比例适配
		this.vm.renderer.shadowMapEnabled = true
		this.vm.renderer.setClearColor('#f7fce3', 1)
	}

	initCamera() {
		// this.vm.camera = new THREE.PerspectiveCamera(20, 0.5, 1, 30000)
		// this.vm.camera.position.set(3500, 3500, 6550);
		// this.vm.camera.position.set(5000, 5000, 5550);
		// this.vm.camera.position.set(8875, 8875, 7850)
		this.vm.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 5000);
		this.vm.camera.position.set(0, 550, 100)

		// this.vm.camera = new THREE.PerspectiveCamera(30, 0.5, 1, 2000)  //透视相机;far: 加载的范围，与性能有关
		// this.vm.camera.position.set(-375, -375, 850)
		this.vm.camera.up.x = 0
		this.vm.camera.up.y = 0
		this.vm.camera.up.z = 0
		// this.vm.camera.up.z = 1
		this.vm.camera.lookAt(this.vm.scene.position)
	}

	initLight() {
		this.vm.scene.add(new THREE.AmbientLight(0xc9c9c9))
		const directional = new THREE.DirectionalLight(0xc9c9c9, 0.5)
		directional.position.set(-2, 3, 1)
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

	initBall() {
		this.vm.ball.setGameScene(this);
		this.vm.ball.createCube();
		const duration = 0.5,
			delay = 1
		//初始方块动画
		this.initBallAnimate(this.vm.ball.cube,duration, delay);
	}

	initRunner() {
		//创建球，游戏运行逻辑，地图
		this.vm.runner.setGameScene(this)
		console.log('in initRunner this.vm.map', this.vm.map)
		this.vm.runner.setMap(this.vm.map)
		this.createLines()
	}

	initMapData() {
		const jsonStr = JSON.stringify(position);
		console.log('position', position)
		this.vm.map.generateFromJson(jsonStr, groceryStr);
	}

	initCalVals() {
		if(this.vm.models.length === 0) return
		if(!this.calval.diamentMesh || this.calval.diamentMesh.length === 0) {
			this.calval.diamentMesh = this.vm.models.filter(model => model.name === 'DIAMENT')
			this.calval.diamentMesh.forEach((d, i) => {
				d.name = 'DIAMENT_' + i
			})
		}
		
		if(!this.calval.crownMesh || this.calval.crownMesh.length === 0) {
			this.calval.crownMesh = this.vm.models.filter(model => model.name === 'CROWN')
			this.calval.crownMesh.forEach((d, i) => {
				d.name = 'CROWN_' + i
			})
		}
		//this.calval.crownMesh = this.vm.models.find(model => model.name === 'CROWN')
		this.calval.sortMeshs = this.vm.models.filter(model => model.animated)
	}

	initBallAnimate(mesh, duration, delay) {
		var game = this;
		new __TWEEN.Tween({scale: 0, rotation: 0, mesh: mesh})
			.to({
				scale: 1,
				rotation: -0.25* Math.PI
			}, duration)
			.delay(delay)
			.onUpdate(function() {
				this.mesh.scale.x = this.scale
				this.mesh.rotation.y = this.rotation
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
		//镜头旋转
		// if(this.gameStatus.part2) {
		// if(this.vm.runner.cursor_.name === '2') {
			// this.vm.threeCamera.setTargetRotation(-0.3*Math.PI, this.vm.camera, 3) //逆时针
			// this.vm.threeCamera.setTargetRotation(-0.35*Math.PI, this.vm.camera, 3)
			// this.vm.threeCamera.setTargetRotation(0.01*Math.PI, this.vm.camera, 3)
		// }
	}

	getMove() {
		const speed = this.vm.delta / 1000
		this.vm.runner.run(speed);
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

	changeDiamentPosition (diament) {
		this.vm.getDiamentCount++;
		this.destory(diament);
	}
	
	changeCrownPosition (crown) {
		this.vm.getCrownCount++;
		this.destory(crown);
	}

	checkGameStatus () {
		if(this.calval.crownMesh && this.calval.crownMesh.length > 0 && this.vm.ball.cube.position.x >= this.calval.crownMesh[0].position.x && !this.gameStatus.part2) {
			this.initPart2()
			this.gameStatus.part1 = false
			this.gameStatus.part2 = true
		}
	}

	animateDiament (diament, angle) {
		Object.keys(diament).length>0 && (diament.rotation.y -= angle)
	}

	animateCrown (crown, angle) {
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
			return
		}
		if (that.vm.gameState.IsStart()) {
			console.log('onTouchStart turn')
			that.vm.runner.turn()
		} else {
			console.log('onTouchStart start')
			that.startGame()
			audio(1, that.vm.innerAudioContext)
			// that.calval.sortMeshs.forEach( mesh => {
			// 	that.animateBlocks(mesh)
			// })
		}
	}

	//第二部分场景
	initPart2() {
		const data = new gamepart2(),
			that = this
		this.part2.part2Cube = data.cubes
		// this.part2.platformStart1Pos = data.cubes.find(cube => cube.name && cube.name === 'PLATFORM_START_1')
		// this.part2.platformEnd1Pos = data.cubes.find(cube => cube.name && cube.name === 'PLATFORM_END_1')
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
		console.log('data.cubes', data.cubes)
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
		this.calval.diamentMesh && this.calval.diamentMesh.forEach(diament => {
			this.animateDiament(diament, 0.05)
		})
		this.calval.crownMesh && this.calval.crownMesh.forEach(mesh => {
			this.animateCrown(mesh, 0.05)
		})
		if (this.gameStatus.part2) {

			let cursorNum = +this.vm.runner.cursor_.name;

			// 抖动的线动画
			// this.strings.forEach(strObj => {
			// 	strObj.anim()
			// })

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
		var material = new THREE.LineBasicMaterial({ color: '#000' });
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
		console.log('createLines this.vm.map.standBlock', this.vm.map.standBlock)
		Loop(this.vm.scene, this.vm.map.standBlock);
		for (var i = 0; i < this.vm.map.floors.length; ++i) {
			var r = this.vm.map.floors[i];
			var material = new THREE.LineBasicMaterial({ color: 0xff0000+i*20 });
			
			var geometry = new THREE.Geometry();
			geometry.vertices.push(r.p1);
			geometry.vertices.push(r.p2);
			geometry.vertices.push(r.p3);
			geometry.vertices.push(r.p4);
			geometry.vertices.push(r.p1);
			var line = new THREE.Line(geometry, material);
			this.vm.scene.add(line);
		}
	}

	//interface GameScene for Runner
	startSegment (startpos, direction, corner) {
		console.log("pos:" + startpos.x + "," + startpos.y + "," + startpos.z);
		this.vm.ball.startSegment(startpos, direction, corner);
		/*
		//相机随着线的运动，镜头跟着走
		const offest = 380;
			//zAsc = 0.00 //夹角增量
		this.vm.camera.position.x = startpos.x - offest;
		this.vm.camera.position.y = startpos.y - offest;
		this.vm.camera.position.z = 850;
		*/
	}

	doneSegment (startpos, endpos) {
		this.vm.ball.doneSegment(startpos, endpos);
	}

	walkSegment (startpos, endpos, droped) {
		this.vm.ball.walkSegment(startpos, endpos, droped);
		/*
		//相机随着线的运动，镜头跟着走
		const offest = 380,
			zAsc = 0.00 //夹角增量
		this.vm.camera.position.x = endpos.x - offest;
		this.vm.camera.position.y = endpos.y - offest;
		this.vm.camera.position.z = 850;
		*/
	}

	bumpWall(pos) {
		this.gameover("游戏结束");
	}

	flyOut(pos) {
		this.gameover("游戏结束");
	}

	hitDiamond(index) {
		console.log("HitDiamond:" + index);
		if (this.calval.diamentMesh == null) {
			return ;
		}
		console.log("钻石个数：" + this.calval.diamentMesh.length);
		if (index < this.calval.diamentMesh.length) {
			this.changeDiamentPosition(this.calval.diamentMesh[index]);
		}
	}

	attainCrown(index) {
		console.log("AttainCrown:" + index);
		if (this.calval.crownMesh == null) {
			return ;
		}
		console.log("皇冠个数：" + this.calval.crownMesh.length);
		if (index < this.calval.crownMesh.length) {
			this.changeCrownPosition(this.calval.crownMesh[index]);
		}
	}

	passNode(pos, name) {
		if (name === "destination") {
			this.gameover("恭喜过关");
			//this.vm.runner.passMission();
		}
	}

	getCollisions(type) {
		if (type === 1) {
			const collisions = this.vm.models.filter(model => ~this.vm.wallCollision.indexOf(model.name));
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
	
	GetCamera() {
		return this.vm.camera;
	}

	onWindowResize() {
		let width = window.innerWidth || window.document.body.clientWidth,
			height = window.innerHeight || window.document.body.clientHeight
		this.vm.renderer.setSize(width, height)
		this.vm.camera.aspect = width / height
		this.vm.camera.updateProjectionMatrix()
	}
}

