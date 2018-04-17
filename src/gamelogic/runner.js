import CameraShift from './camerashift.js'
/*
listen.startSegment(startpos, direction)
listen.doneSegment(startpos, endpos)
listen.walkSegment(startpos, endpos)
listen.bumpWall(startpos)
listen.flyOut(startpos)
listen.hitDiamond(index)
listen.attainCrown(index)
listen.passNode(pos, name)
*/
const MinDelta = 0.01;

function PtInRect(p, p1, p2, p3, p4) {
	var pts = [p1, p2, p3];
	for (var i = 0; i < pts.length - 1; ++i) {
		var vec1 = pts[i].clone();
		vec1.sub(pts[i + 1]);
		var vecA = p.clone();
		vecA.sub(pts[i]);
		var vecB = p.clone();
		vecB.sub(pts[i + 1]);
		var vecCheck = vecA.clone();
		if (vecB.lengthSq() > vecA.lengthSq()) {
			vecCheck = vecB.clone();
		}
		vecCheck.projectOnVector(vec1);
		if (vecCheck.lengthSq() > vec1.lengthSq()) {
			return false;
		}
	}
	return true;
}

export default class Runner {
	size = 20;
	height = 14;
	game = null;
	direction_ = new THREE.Vector3(0, 0, 0);
	preDirection = new THREE.Vector3(0, 0, 0);
	map_ = null;
	cursor_ = null;
	position_ = new THREE.Vector3(0, 0, 0);
	droped = false;
	finish = false;
	flyDuration = 0;
	nodes_ = [];
	speed = 130;
	gravity = new THREE.Vector3(0, 0, -300);

	wallCollisions = null;

	//相机平移类
	cameraShift = new CameraShift;

	////Functions
	setGameScene(gameScene) {
		this.game = gameScene;
		this.cameraShift.SetCamera(this.game.GetCamera());
	}

	setMap(map) {
		this.reset()
		this.map_ = map
		console.log('in setMap this.map_', this.map_)
		this.passNode(this.map_.standBlock)
		//this.cursor_ = this.map_.standBlock;
		let direction = this.calcNextDirection()
		console.log('in setMap direction', direction)
		if (direction) {
			this.direction_.copy(direction)
		}
		if (this.cursor_) {
			this.position_.copy(this.cursor_.position)
			this.nodes_.push(this.position_.clone())
		}
		if (this.game) {
			this.game.startSegment(this.position_, this.direction_, true)
		}
	}

	getPosition() {
		return this.position_;
	}

	getDirection() {
		return this.direction_;
	}

	getLastTailLength() {
		var vecTail = this.position_.clone();
		vecTail.sub(this.nodes_[this.nodes_.length - 1]);
		vecTail.length();
	}

	passMission () {
		this.finish = true;
		this.TurnDirection();
	}

	turn () {
		if (!this.map || this.droped || this.finish) return;
		this.TurnDirection();
	}

	run (duration) {
		// console.log('in run this.direction_', this.direction_)
		if (!this.map_) return
		// console.log('in run this.cursor_', this.cursor_)
		if (this.cursor_) {
			let offsetVec = this.direction_.clone();
			offsetVec.multiplyScalar(duration * this.speed)
			this.position_.add(offsetVec)
			// console.log('in run this.position_', this.position_)
			// console.log('in run offsetVec', offsetVec)
			//掉落
			if (this.droped) {
				var offsetZ = this.gravity.clone();
				offsetZ.multiplyScalar(this.flyDuration);
				offsetZ.multiplyScalar(duration / 2);
				this.position_.add(offsetZ);
			}
			if (this.game) {
				let start = this.nodes_.length - 1;
				this.game.walkSegment(this.nodes_[start], this.position_, this.droped);
			}
		}
		//更新相机
		// this.cameraShift.Update(duration);
		// this.detectCookies();
		if (!this.finish) {
			//碰撞检测
			// this.detectCollision();
			//掉落检测
			// if (this.droped) {
			// 	this.flyDuration += duration;
			// 	if (!this.detectDrop(false)) {
			// 		this.flyDuration = 0;
			// 		this.droped = false;
			// 		this.updateCursor(true);
			// 		this.nodes_.push(this.position_.clone());
			// 		this.game.startSegment(this.position_, this.direction_, false);
			// 	} else {
			// 		this.detectFlyout();
			// 	}
			// } else {
			// 	this.updateCursor(true);
			// 	if (this.detectDrop(false)) {
			// 		this.flyDuration = 0;
			// 		this.droped = true;
			// 		//开始掉落
			// 		this.nodes_.push(this.position_.clone());
			// 		let start = this.nodes_.length - 2;
			// 		this.game.doneSegment(this.nodes_[start], this.nodes_[start + 1]);
			// 	}
			// }
		} else {
			this.updateCursor(true);
		}
	}

	TurnDirection () {
		var direction = this.calcNextDirection();
		console.log('TurnDirection direction', direction)
		if (direction) {
			direction.y = 0;
			this.preDirection = this.direction_;
			this.direction_.copy(direction);
			this.nodes_.push(this.position_.clone());
			if (this.game) {
				var start = this.nodes_.length - 2;
				this.game.doneSegment(this.nodes_[start], this.nodes_[start + 1]);
				this.game.startSegment(this.position_, this.direction_, true);
			}
		}
	}

	updateCursor (force) {
		if (this.cursor_.links.length > 0) {
			function LoopFind(cursor, p, loop) {
				for (var i = 0; i < cursor.links.length; ++i) {
					//Detect Self
					var rect = cursor.rects[i];
					if (PtInRect(p, rect.p1, rect.p2, rect.p3, rect.p4)) {
						return cursor;
					}
					//Detect Links
					var findNode = null;
					var node = cursor.links[i];
					for (var j = 0; j < node.rects.length; ++j) {
						var rect = node.rects[j];
						if (PtInRect(p, rect.p1, rect.p2, rect.p3, rect.p4)) {
							findNode = node;
							break;
						}
					}
					//Loop
					if (loop && !findNode) {
						for (var j = 0; j < node.links.length; ++j) {
							findNode = LoopFind(node.links[j], p, loop);
							if (findNode) {
								break;
							}
						}
					}
					return findNode;
				}
			}

			var findNode = LoopFind(this.cursor_, this.position_, force);
			if (findNode !== this.cursor_) {
				console.log('in updateCursor')
				this.passNode(findNode)
			}
		}
	}

	passNode(node) {
		if (!node) return;
		console.log("通过节点:" + node.name)
		console.log("通过节点 node", node)
		this.cursor_ = node;
		//更新相机移动信息
		if (node.cameraMoveVec) {
			this.cameraShift.SetMoveSpeed(node.cameraMoveVec);
		}
		if (node.cameraRotateVec) {
			this.cameraShift.SetRotateSpeed(node.cameraRotateVec);
		}
		//尝试过关
		this.game.passNode(this.cursor_.position, this.cursor_.name)
	}

	calcNextDirection() {
		if (!this.cursor_) return
		//No point
		if (this.cursor_.links.length === 0) {
			return null
		} else {
			console.log('in calcNextDirection 1')
			let deltaD = this.direction_.clone()
			deltaD.sub(this.cursor_.normals[0])
			//Restore the direction
			if (deltaD.lengthSq() > MinDelta) {
				console.log('in calcNextDirection 2 this.cursor_', this.cursor_)
				return this.cursor_.normals[0].clone()
			}
			let index = 0
			//Find right index
			for (let i = 0; i < this.cursor_.rects.length; ++i) {
				if (this.cursor_.links[i].boundary) continue
				let rect = this.cursor_.rects[i]
				if (PtInRect(this.position_, rect.p1, rect.p2, rect.p3, rect.p4)) {
					index = i
					break
				}
			}
			//Find a better direction
			if (index >= 0) {
				let nextCursor = this.cursor_.links[index]
				for (let i = 0; i < nextCursor.normals.length; ++i) {
					let vec = this.direction_.clone()
					vec.sub(nextCursor.normals[i])
					if (vec.lengthSq() > MinDelta) {
						console.log('in calcNextDirection 3')
						return nextCursor.normals[i].clone()
					}
				}
			}
			console.log('in calcNextDirection this.preDirection', this.preDirection)
			return this.preDirection.clone()
		}
	}

	reset() {
		this.direction_.set(0, 0, 0);
		this.map_ = null;
		this.index_ = 0;
		this.position_.set(0, 0, 0);
		this.turned_ = false;
		this.nodes_ = [];
		this.droped = false;
		this.finish = false;
		this.flyDuration = 0;
	}

	detectCookies() {
		if (this.map_ == null) return;
		var offsetSq = (this.size * this.size);
		var position = this.position_.clone();
		//position.z -= this.height / 2;
		//判断钻石
		for (var i = 0; i < this.map_.diamonds.length; ++i) {
			if (this.map_.diamonds[i].attain) continue;
			var vec = this.map_.diamonds[i].position.clone();
			vec.sub(position);
			if (vec.lengthSq() < offsetSq) {
				this.map_.diamonds[i].attain = true;
				this.game.hitDiamond(this.map_.diamonds[i].index);
			}
		}
		//判断皇冠
		for (var i = 0; i < this.map_.crowns.length; ++i) {
			if (this.map_.crowns[i].attain) continue;
			var vec = this.map_.crowns[i].position.clone();
			vec.sub(position);
			//console.log("Crown:" + vec.lengthSq());
			if (vec.lengthSq() < offsetSq) {
				this.map_.crowns[i].attain = true;
				this.game.attainCrown(this.map_.crowns[i].index);
			}
		}
	}

	detectCollision() {
		var originPoint = this.position_.clone();
		//计算出2个点
		var axisZ = new THREE.Vector3(0, 0, 1);
		var vecV = this.direction_.clone();
		var vecH = new THREE.Vector3(0, 0, 0);
		vecH.crossVectors(axisZ, vecV);
		vecH.normalize();
		vecV.multiplyScalar(this.size / 2);
		vecH.multiplyScalar(this.size / 2);
		var pts = [originPoint.clone(), originPoint.clone()];
		pts[0].sub(vecV).add(vecH);
		//pts[1].sub(vecV).sub(vecH);
		pts[1].sub(vecV);
		if (this.wallCollisions == null) {
			this.wallCollisions = this.game.getCollisions(1);
		}
		for (var i = 0; i < pts.length; ++i) {
			let ray = new THREE.Raycaster(pts[i], this.direction_.clone(), 0, this.size);
			let collisionResults = ray.intersectObjects(this.wallCollisions);
			if (collisionResults.length > 0 && collisionResults[0].distance < this.size) {
				if (collisionResults[0].object.name.indexOf('DIAMENT') > -1) {
					//this.game.hitDiamond(collisionResults[0].object);
					break;
				} else if (collisionResults[0].object.name.indexOf('CROWN') > -1) {
					//this.game.attainCrown(collisionResults[0].object)
					break;
				} else {
					this.game.bumpWall(originPoint.clone());
					break;
				}
			}
		}
	}

	detectDrop(front) {
		var drop = true;
		if (this.map_ == null) return drop;
		var originPoint = this.position_.clone();
		originPoint.z -= this.height / 2;
		for (var i = 0; i < this.map_.floors.length; ++i) {
			var rect = this.map_.floors[i];
			//判断Z轴，先简单判断
			var z = originPoint.z - rect.p1.z;
			if (Math.abs(z) >= 2) {
				continue;
			}
			//判断区域
			if (PtInRect(originPoint, rect.p1, rect.p2, rect.p3, rect.p4)) {
				drop = false;
				break;
			}
		}
		return drop
		// //计算出2个点
		// var axisZ = new THREE.Vector3(0, 0, 1);
		// var vecU = axisZ.clone();
		//
		// vecU.multiplyScalar(this.size / 2);
		//
		// var pts = [originPoint.clone()];
		// //pts[0].sub(vecV).add(vecU).add(vecH);
		// //pts[1].sub(vecV).add(vecU).sub(vecH);
		// pts[0].add(vecU);
		//
		// const collisions = this.game.getCollisions(2);
		//
		// var vecDown = axisZ.clone();
		// vecDown.multiplyScalar(-1);
		//
		// for (var i = 0; i < pts.length; ++i) {
		//
		// 	let ray = new THREE.Raycaster(pts[i], vecDown);
		// 	let collisionResults = ray.intersectObjects(collisions);
		//
		// 	if (this.droped && collisionResults.length > 0) {
		// 		console.log("物体个数：" + collisionResults.length);
		// 	}
		//
		// 	if (collisionResults.length > 0 && collisionResults[0].distance < 100) {
		//
		// 		drop = false;
		// 		break;
		// 	}
		// }
		// return drop;
	}

	detectFlyout() {
		if (this.flyDuration > 1.0) {
			this.game.flyOut(this.position_);
		}
	}
}
