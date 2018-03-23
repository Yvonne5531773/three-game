'use strict'
import { lands } from '../../models/part2/land'

export default class gamePart2 {
	materials = {
		bottom: new THREE.MeshLambertMaterial({color: '#dfcda0', ambient: '#dfcda0', transparent: true})
	}
	cubes = []

	constructor() {
		this.init()
	}

	init() {
		lands.forEach(land => {
			const geometry = new THREE.BoxGeometry(land.width, land.height, land.depth)
			const cube = this.initCube({
				geometry: geometry,
				material: this.materials.bottom,
				position: land,
			})
			cube.x = land.x
			cube.z = land.z
			cube.delay = land.delay
			cube.duration = land.duration
			cube.animate = land.animate
			cube.visible = land.visible || false
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

