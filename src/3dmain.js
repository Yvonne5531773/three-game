'use strict'

import '../libs/weapp-adapter'
import { audio, submitRequest, threeParse } from '../utils/index'
import model from '../models/index'
import config from '../config/index'
import { __TWEEN } from '../libs/tween'
import gamepart2 from 'part2/gamepart2'

export default class gameDanceLine {
	vm = {
		innerAudioContext: {},
		scene: {},
		renderer: {},
		camera: {},
		aRequest: {},
		cube: [],
		part2Cube: [],
		len: 1,
		nx: 40,                     //范围宽
		ny: 40,                     //范围高
		snake: [],
		snakeVolumn: 14,
		startX: 0,
		startY: 0,
		headX: 0,                   //开始X
		headY: 0,                  //开始Y
		headForward: 2,             //方向
		pauseFlag: true,
		directionX: [0, -1, 1, 0],
		directionY: [1, 0, 0, -1],
		clickCount: 0,
		end: false,
		models: [],
		collisionExcepts: ['LEFT_BARRICADE', 'RIGHT_BARRICADE', 'BARRICADE'],
		snakeSpeed: 5,
		fps: 60,
		now: '',
		then: Date.now(),
		delta: '',
		getDiamentCount: 0,
		blockAnimateIndex: 0,
		initCubePosition: {},
		initGeometry: {},
		initMaterial: {}
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
		platformStart1: false,
		platformEnd1: false,
		platformStart1Pos: {},
		platformEnd1Pos: {}
	}
	//touch的回调方法
	eventTouchStartFun = this.onTouchStart.bind(null, this)

	constructor() {
		this.init()
		this.run()
		//调整屏幕
		this.onWindowResize()
	}

	init() {
		//方块常量
		this.vm.geometry = new THREE.BoxGeometry(this.vm.snakeVolumn, this.vm.snakeVolumn, this.vm.snakeVolumn / 1.3)
		this.vm.materials = {
			barricade: new THREE.MeshLambertMaterial({color: '#575a52', ambient: '#575a52', lineWidth: 1}),
			block: new THREE.MeshLambertMaterial({color: '#e9e9e9', ambient: '#e9e9e9', lineWidth: 1}),
			cube: new THREE.MeshLambertMaterial({color: '#e7b066', ambient: '#e7b066', lineWidth: 1}),
			diament: new THREE.MeshLambertMaterial({color: '#f9eb4c', ambient: '#f9eb4c', lineWidth: 1}),
			crown: new THREE.MeshLambertMaterial({color: '#f9eb4c', ambient: '#f9eb4c', lineWidth: 1}),
			plane: new THREE.MeshBasicMaterial( {color: '#f6e2b1', ambient: '#f6e2b1', side: THREE.DoubleSide} )
			// plane: new THREE.MeshLambertMaterial({color: '#dfcda0', ambient: '#dfcda0'})
		}
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
		//运动方块块
		this.initSnake(0)
		//初始方块动画
		this.initSnakeAnimate()
		//初始化开始位置
		this.setInitCubePosition({x: this.vm.cube[0].position.x, y: this.vm.cube[0].position.y})
		//地板块
		this.initPlane({
			sizeX: 3* 1100,
			sizeY: 3* 1080,
			x: 1100- 580,
			y: 1080- 400,
			z: -12,
		})

		this.initPart2()
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
		// this.vm.camera = new THREE.PerspectiveCamera(10, 0.5, 1, 12000)
		// this.vm.camera.position.set(-375, -380, 1600);  //3 俯视的高度
		// this.vm.camera.position.set(-4000, -4000, 6550);  //3 俯视的高度
		// this.vm.camera.position.set(-3000, -3000, 5550);  //3 俯视的高度

		this.vm.camera = new THREE.PerspectiveCamera(40, 0.5, 1, 2000)  //透视相机;far: 加载的范围，与性能有关
		this.vm.camera.position.set(-375, -380, 600)
		this.vm.camera.up.x = 0
		this.vm.camera.up.y = 0
		this.vm.camera.up.z = 1
		this.vm.camera.lookAt(this.vm.scene.position)
	}

	initLight() {
		this.vm.scene.add(new THREE.AmbientLight(0xc9c9c9))
		const directional = new THREE.DirectionalLight(0xc9c9c9, 0.5)
		directional.position.set(-2, 1, 3)
		directional.shadowMapHeight = 2048
		directional.shadowMapWidth = 2048
		this.vm.scene.add(directional)
	}

	initCube() {
		const hex = ['#ffe3ae', '#ff9632'];
		for (let i = 0; i < this.vm.geometry.faces.length; i += 2) {
			this.vm.geometry.faces[i].color.setHex(hex[0])
			this.vm.geometry.faces[i + 1].color.setHex(hex[1])
		}
		const mesh = new THREE.Mesh(this.vm.geometry, this.vm.materials.cube)
		mesh.updateMatrix()
		mesh.name = 'SNAKE_CUBE_'+this.vm.len
		return mesh
	}

	initPlane({sizeX, sizeY, x, y, z}) {  //地板
		// const geometry = new THREE.PlaneGeometry(sizeX, sizeY, this.vm.nx, this.vm.ny),
		const geometry = new THREE.PlaneBufferGeometry(sizeX, sizeY, this.vm.nx, this.vm.ny),
			material = this.vm.materials.plane,
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
					material = this.vm.materials.barricade; break;
				case 'WHITE_THICK_BLOCKS':
				case 'WHITE_MIDDLE_BLOCKS':
				case 'WHITE_FINE_BLOCKS':
					material = this.vm.materials.block; break;
				case 'DIAMENT':
					material = this.vm.materials.diament; break;
				case 'CROWN':
					material = this.vm.materials.crown; break;
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

	initSnake(segment) {
		if(!this.vm.len) return
		for (let i = 0; i < this.vm.len; i++) {
			this.vm.snake[i] = {}
			this.vm.snake[i].x = this.vm.headX + i * this.vm.directionX[3 - this.vm.headForward]
			this.vm.snake[i].y = this.vm.headY + i * this.vm.directionY[3 - this.vm.headForward]
			this.vm.cube[i] = this.initCube()
			this.vm.cube[i].position.x = this.vm.snake[i].x * this.vm.snakeSpeed - this.vm.startX
			this.vm.cube[i].position.y = -this.vm.snake[i].y * this.vm.snakeSpeed + this.vm.startY
			this.vm.cube[i].visible = false
			this.vm.cube[i].segment = segment
			this.vm.scene.add(this.vm.cube[i])
		}
	}

	initCalVals() {
		if(this.vm.models.length>0 && (!this.calval.diamentMesh || !this.calval.crownMesh || !this.calval.sortMeshs)) {
			this.calval.diamentMesh = this.vm.models.find(model => model.name === 'DIAMENT')
			this.calval.crownMesh = this.vm.models.find(model => model.name === 'CROWN')
			this.calval.sortMeshs = this.vm.models.filter(model => model.msort !== 0)
			this.calval.sortMeshs.sort((a, b) => {
				if(a.msort > b.msort) return 1
				else if(a.msort < b.msort) return -1
			})
		}
	}

	initSnakeAnimate() {
		const duration = 0.5,
			delay = 1
		new __TWEEN.Tween({scale: 0, rotation: 0, mesh: this.vm.cube[0]})
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

	initEvents() {
		document.addEventListener('touchstart', this.eventTouchStartFun, false)
	}

	removeEvents() {
		document.removeEventListener('touchstart', this.eventTouchStartFun, false)
	}

	doRender() {
		//运动的位置随速度变化
		// if (this.vm.pauseFlag) {
		// 	this.vm.cube[0].position.x = this.vm.snake[0].x * this.vm.snakeSpeed - this.vm.startX
		// 	this.vm.cube[0].position.y = -this.vm.snake[0].y * this.vm.snakeSpeed + this.vm.startY
		// 	this.vm.cube[0].position.z = 0
		// } else {
		// 	this.vm.cube[0].geometry.parameters.width = ++this.vm.cube[0].geometry.parameters.width
		// }
		!this.vm.pauseFlag && (this.vm.cube[0].geometry.parameters.width = ++this.vm.cube[0].geometry.parameters.width)
		if(!this.vm.pauseFlag) {
			for (let i = 0; i < this.vm.len; ++i) {
				this.vm.cube[i].position.x = this.vm.snake[i].x * this.vm.snakeSpeed - this.vm.startX
				this.vm.cube[i].position.y = -this.vm.snake[i].y * this.vm.snakeSpeed + this.vm.startY
				this.vm.cube[i].position.z = 0
			}
		}
		//相机随着线的运动，镜头跟着走
		const offest = 400,
			zAsc = 0.08 //夹角增量
		this.vm.camera.position.x = this.vm.cube[0].position.x - offest
		this.vm.camera.position.y = this.vm.cube[0].position.y - offest
		!this.vm.pauseFlag && (this.vm.camera.position.z += zAsc)
		this.vm.renderer.render(this.vm.scene, this.vm.camera)

		//初始化Mesh分类的数组
		this.initCalVals()
	}

	getMove() {
		const tx = this.vm.snake[0].x + this.vm.directionX[this.vm.headForward],
			ty = this.vm.snake[0].y + this.vm.directionY[this.vm.headForward]
		if (!this.vm.pauseFlag) {
			this.vm.snake[this.vm.len] = {}
			this.vm.snake[this.vm.len].x = this.vm.snake[this.vm.len - 1].x
			this.vm.snake[this.vm.len].y = this.vm.snake[this.vm.len - 1].y
			this.vm.cube[this.vm.len] = this.initCube()
			//发射过程中，不追加
			// if(!this.part2.platformStart1 || this.part2.platformEnd1){
			// 	this.vm.scene.add(this.vm.cube[this.vm.len])
			// } else {
			// 	console.log('launching')
			// }
			if(this.vm.cube[0].segment === 0) {
				if(this.vm.cube[0].position.x > 20){
					console.log('launching cube', this.vm.cube)
					this.vm.headX = this.vm.cube[0].position.x
					this.vm.headY = this.vm.cube[0].position.y
					this.vm.cube = []
					this.vm.len = 1
					this.initSnake(1)
					this.setInitCubePosition({x: this.vm.cube[0].position.x, y: this.vm.cube[0].position.y})
					this.animateSnakeHead({
						criteria: {
							x: this.vm.cube[0].position.x, z: 0, mesh: this.vm.cube[0]
						},
						delay: 0,
						duration: .3,
						x: 200,
						z: -40,
						that: this
					})
					//todo 发射过程不能getmove
				} else {
					this.vm.scene.add(this.vm.cube[this.vm.len])
					this.vm.len++
				}
			}
			// this.vm.scene.add(this.vm.cube[this.vm.len])
			// this.vm.len++
		}
		for (let i = this.vm.len - 1; i > 0; i--) {
			this.vm.snake[i].x = this.vm.snake[i - 1].x
			this.vm.snake[i].y = this.vm.snake[i - 1].y
		}
		this.vm.snake[0].x = tx
		this.vm.snake[0].y = ty
	}

	run() {
		this.vm.aRequest = window.requestAnimationFrame(this.run.bind(this), canvas)
		this.vm.now = Date.now()
		this.vm.delta = this.vm.now - this.vm.then
		if (this.vm.delta > 1000 / this.vm.fps) {
			this.vm.then = this.vm.now - (this.vm.delta % 1000 / this.vm.fps)
			if (!this.vm.pauseFlag){
				this.getMove()
				// this.checkCollision()
				//检测是否到发射台
				this.launch()
				//销毁超出屏幕的对象
				this.release()
			}
			this.doRender()
			this.animates()
			this.checkGameStatus()
			this.vm.end && window.cancelAnimationFrame(this.vm.aRequest)
			__TWEEN.update()
		}
		// if (!this.vm.pauseFlag) {
		// 	this.getMove()
		// 	//检查碰撞
		// 	this.checkCollision()
		// }
		// this.doRender()
		// this.animates()
		// this.vm.end && window.cancelAnimationFrame(this.vm.aRequest)
		// __TWEEN.update()
	}

	changeDiamentPosition(diament) {
		const position = model.diamentOffests[++this.vm.getDiamentCount]
		!position && this.destory(diament)
		position && diament.position.set(position.x, position.y, position.z)
	}

	checkCollision() {
		const movingCube = this.vm.cube[0],
			collisions = this.vm.models.filter(model => !~this.vm.collisionExcepts.indexOf(model.name))
		let originPoint = movingCube.position.clone()
		for (let vertexIndex = 0; vertexIndex < movingCube.geometry.vertices.length; vertexIndex++) {
			// 顶点原始坐标
			let localVertex = movingCube.geometry.vertices[vertexIndex].clone()
			// 顶点经过变换后的坐标
			let globalVertex = localVertex.applyMatrix4(movingCube.matrix)
			let directionVector = globalVertex.sub(movingCube.position)
			let ray = new THREE.Raycaster(originPoint, directionVector.clone().normalize())
			let collisionResults = ray.intersectObjects(collisions)
			if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
				if (collisionResults[0].object.name === 'DIAMENT') {
					this.changeDiamentPosition(collisionResults[0].object)
				} else {
					this.gameover('游戏结束！')
					break
				}
			}
		}
	}

	checkGameStatus () {
		if(this.calval.crownMesh && this.calval.crownMesh && this.vm.cube[0].position.x >= this.calval.crownMesh.position.x && !this.gameStatus.part2) {
			this.initPart2()
			this.gameStatus.part1 = false
			this.gameStatus.part2 = true
		}
	}

	gameover(title) {
		this.vm.end = true
		wx.showToast({
			title: title
		})
		this.removeEvents()
		setTimeout(() => {
			// location.reload()
			audio(2, this.vm.innerAudioContext)
		}, 1000)
	}

	destory(mesh) {
		const meshObj = this.vm.scene.getObjectByName(mesh.name)
		mesh && this.vm.scene.remove(meshObj)
	}

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
		that.vm.pauseFlag && (that.vm.pauseFlag = false)
		that.vm.clickCount === 0 && audio(1, that.vm.innerAudioContext)
		that.vm.clickCount % 2 === 0 && (that.vm.headForward = 2)
		that.vm.clickCount % 2 === 1 && (that.vm.headForward = 3)
		that.vm.clickCount++
	}

	onWindowResize() {
		let width = window.innerWidth || window.document.body.clientWidth,
			height = window.innerHeight || window.document.body.clientHeight
		this.vm.renderer.setSize(width, height)
		this.vm.camera.aspect = width / height
		this.vm.camera.updateProjectionMatrix()
	}

	//第二部分场景开始
	initPart2() {
		const data = new gamepart2(),
			that = this
		this.vm.part2Cube = data.cubes
		this.part2.platformStart1Pos = data.cubes.find(cube => cube.name && cube.name === 'PLATFORM_START_1')
		this.part2.platformEnd1Pos = data.cubes.find(cube => cube.name && cube.name === 'PLATFORM_END_1')
		console.log('initPart2 this.part2', this.part2)
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

	launch() {
		if(!this.gameStatus.part2) return
		const position = this.vm.cube[0].position
		if(position.x >= this.part2.platformStart1Pos.x && !this.part2.platformStart1) {
			console.log('in launch position', position)
			this.part2.platformStart1 = true
			this.animateSnakeHead({
				criteria: {
					x: this.part2.platformStart1Pos.x, z: 0, mesh: this.vm.cube[0]
				},
				delay: 0,
				duration: .3,
				x: this.part2.platformEnd1Pos.x,
				z: -40,
				that: this
			})
		}
	}

	animateSnakeHead({criteria = {}, delay = 1, duration = 1, x = 0, y = 0, z = 0, that}) {
		new __TWEEN.Tween(criteria)
			.to({
				x: x,
				z: z
			}, duration)
			.delay(delay)
			.onUpdate(function() {
				console.log('animateSnakeHead this.mesh', this.mesh)
				console.log('animateSnakeHead this.x', this.x)
				this.mesh.position.x = this.x
				this.mesh.position.z = this.z
			})
			.easing(__TWEEN.Easing.Linear.None)
			.onStart(function () {
				this.mesh.visible = true
			})
			.onComplete(function() {
				that.part2.platformEnd1 = true
			})
			.start()
	}
}

