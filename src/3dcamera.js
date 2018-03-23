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

	setTargetRotation (theta, camera) {
		new __TWEEN.Tween({theta: theta})
			.to({
				theta: -0.25* Math.PI/100
			}, 2)
			.delay(0)
			.onUpdate(function() {
				console.log(this.theta)
				// camera.rotation.x += this.theta/10
				// camera.rotation.y += this.theta/10
				camera.rotation.z += this.theta
			})
			.start()
	}
}