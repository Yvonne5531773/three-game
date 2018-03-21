'use strict'

import '../../libs/weapp-adapter'
import { audio, submitRequest, threeParse } from '../../utils/index'
import model from '../../models/index'
import config from '../../config/index'
import { lands } from '../../models/part2/land'

export default class gamePart2 {
	// material = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: true, lineWidth: 0})
	material = new THREE.MeshLambertMaterial({color: '#fdebbd', wireframe: true, lineWidth: 0})
	// material = new THREE.MeshBasicMaterial( { vertexColors: '#fdebbd'} )

	cubes = []
	constructor() {
		this.init()
	}

	init() {
		lands.forEach(land => {
			const geometry = new THREE.BoxGeometry(land.width, land.height, land.depth, 1, 1, 1)
			const cube = this.initCube({
				hex: land.hex,
				geometry: geometry,
				material: this.material,
				position: land,
			})
			cube.x = land.x
			cube.delay = land.delay
			cube.duration = land.duration
			cube.animate = land.animate
			this.cubes.push(cube)
		})
	}

	initCube({hex, geometry, material, position}) {
		// for (let i = 0; i < geometry.faces.length; i += 2) {
		// 	geometry.faces[i].color.setHex(hex[0])
		// 	geometry.faces[i + 1].color.setHex(hex[1])
		// }
		const mesh = new THREE.Mesh(geometry, material)
		mesh.position.x = position.x
		mesh.position.y = position.y
		mesh.position.z = position.z
		mesh.updateMatrix()
		return mesh
	}
}

