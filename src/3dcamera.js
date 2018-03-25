'use strict'
import { __TWEEN } from '../libs/tween'

export default class threeCamera {
	cameraWorker = {}

	targetRotation = false

	constructor() {
		this.init()
	}

	init() {
		const geometry = new THREE.Geometry()
		geometry.vertices.push(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-Math.sqrt(3) * (20 * 20)), 0, 0)
		this.cameraWorker = new THREE.Line(geometry)
		this.cameraWorker.visible = true
		this.cameraWorker.rotation.set(0, Math.PI* 0.25, Math.PI* 0.2)
	}

	setTargetRotation (rotate, camera, duration = 3) {
		console.log('camera.rotation.z', camera.rotation.z)
		new __TWEEN.Tween({rotationx: camera.rotation.x, rotationy: camera.rotation.y, rotationz: camera.rotation.z})
			.to({
				rotationx: rotate,
				rotationy: rotate,
				rotationz: rotate
			}, duration)
			.delay(0)
			.onUpdate(function() {
				// console.log('camera.rotation.z', camera.rotation.z)
				// camera.rotation.x = this.rotationx
				// camera.rotation.y = this.rotationy
				camera.rotation.z = this.rotationz
			})
			.start()
	}
}