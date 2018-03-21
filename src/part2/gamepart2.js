'use strict'

import '../../libs/weapp-adapter'
import { audio, submitRequest, threeParse } from '../../utils/index'
import model from '../../models/index'
import config from '../../config/index'
import { lands } from '../../models/part2/land'

export default class gamePart2 {
	// material = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: true, lineWidth: 0})
	materials = {
		bottom: new THREE.MeshLambertMaterial({color: '#dfcda0', ambient: '#dfcda0', lineWidth: 1})
	}
	// material = new THREE.MeshBasicMaterial( { vertexColors: '#fdebbd'} )

	cubes = []
	constructor() {
		this.init()
	}

	init() {
		lands.forEach(land => {
			const geometry = new THREE.BoxGeometry(land.width, land.height, land.depth, 1, 1, 1)
			const cube = this.initCube({
				geometry: geometry,
				material: this.materials.bottom,
				position: land,
			})
			cube.x = land.x
			cube.delay = land.delay
			cube.duration = land.duration
			cube.animate = land.animate
			this.cubes.push(cube)
		})
	}

	initCube({geometry, material, position}) {
		const mesh = new THREE.Mesh(geometry, material)
		mesh.position.x = position.x
		mesh.position.y = position.y
		mesh.position.z = position.z
		mesh.updateMatrix()
		return mesh
	}
}

