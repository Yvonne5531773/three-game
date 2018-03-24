'use strict'
import { lands } from '../../models/part2/land'
import { strings } from '../../models/part2/string'
import { hammers } from '../../models/part2/hammer'
import  StringMesh from 'string.js'
import  HammerMesh from 'hammer.js'

export default class gamePart2 {
	materials = {
		bottom: new THREE.MeshLambertMaterial({color: '#dfcda0', ambient: '#dfcda0', transparent: true})
	}
	cubes = []
	strings = []
	hammers = []

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
			cube.name = 'LAND'
			cube.x = land.x
			cube.z = land.z
			cube.delay = land.delay
			cube.duration = land.duration
			cube.animate = land.animate
			cube.visible = land.visible || false
			this.cubes.push(cube)
		})

		// 抖动的线
		strings.forEach(opt => {
			let stringObj = new StringMesh({
				x: opt.x,
				y: opt.y,
				z: opt.z,
				scale: opt.scale,
				gap: opt.gap,
				rate: opt.rate,
				color: opt.color,
			});

			this.strings.push(stringObj);
		})

		// 钢琴锤子
		hammers.forEach(opt => {
			let hammerObj = new HammerMesh({
				x: opt.x,
				y: opt.y,
				z: opt.z,
				scale: opt.scale,
				gap: opt.gap,
				rate: opt.rate,
				zr: opt.zr,
			});

			this.hammers.push(hammerObj);
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

