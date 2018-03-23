import THREE from '../../libs/three.min'


/*
listen.startSegment(startpos, direction)
listen.doneSegment(startpos, endpos)
listen.walkSegment(startpos, endpos)
listen.bumpWall(startpos)
listen.flyOut(startpos)
listen.hitDiamond(index) 
listen.attainCrown(index)
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

export default class Runner 
{
	size = 14;
    game = null;
	
    direction_ = new THREE.Vector3(0, 0, 0);
    map_ = null;
    cursor_ = 0;
    position_ = new THREE.Vector3(0, 0, 0);
    turned_ = false;
    nodes_ = [];
	
	setGameScene(gameScene) {
		this.game = gameScene;
	}
	
    setMap(map) {

        this.reset();

        this.map_ = map;
		this.cursor_ = this.map_.standBlock;

        var direction = this.calcNextDirection();
        if (direction != null) {
            this.direction_.copy(direction);
        }

        if (this.cursor_ != null) {
            this.position_.copy(this.cursor_.position);
            this.nodes_.push(this.position_.clone());
        }

        if (this.game != null) {
            this.game.startSegment(this.position_, this.direction_);
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

    turn() {

        if (this.map_ == null) return;

		var direction = this.calcNextDirection();
        if (direction != null) {
            this.direction_.copy(direction);
            this.nodes_.push(this.position_.clone());

            if (this.game) {
                var start = this.nodes_.length - 2;
                this.game.doneSegment(this.nodes_[start], this.nodes_[start + 1]);

                this.game.startSegment(this.position_, this.direction_);
            }

        }
		
    };

    run(duration) {
        if (this.map_ == null) return;

        if (this.cursor_ != null) {
			var offsetVec = this.direction_.clone();
			offsetVec.multiplyScalar(duration * 100);
			
            this.position_.add(offsetVec);

			
            if (this.game) {
                var start = this.nodes_.length - 1;
                this.game.walkSegment(this.nodes_[start], this.position_);
            }

        }

		this.updateCursor();
		
		//碰撞检测
		// this.detectCollision();
		
		//掉落检测
    }
	
	
	updateCursor() {
		
		if (this.cursor_.links.length > 0) {
				
				for (var i = 0; i < this.cursor_.links.length; ++i) {
					
					{
						var rect = this.cursor_.rects[i];
						if (PtInRect(this.position_, rect.p1, rect.p2, rect.p3, rect.p4)) {
							break;
						}
					}
					
					var findNode = null;
					var node = this.cursor_.links[i];
					for (var j = 0; j < node.rects.length; ++j) {
						
						var rect = node.rects[j];
						if (PtInRect(this.position_, rect.p1, rect.p2, rect.p3, rect.p4)) {
							findNode = node;
							break;
						}
					}
					
					if (findNode) {
						this.cursor_ = findNode;
						//尝试过关和吃皇冠
						
						console.log("通过节点")
						
						break;
					}
				}
		}
		
		//
	}

    calcNextDirection() {

        if (this.cursor_ == null) return ;
		
		//No point 
		if (this.cursor_.links.length == 0) {
			
			return null;
			
		} else {
			
			var deltaD = this.direction_.clone();
			deltaD.sub(this.cursor_.normals[0]);
			//Restore the direction
			if (deltaD.lengthSq() > MinDelta) {
				return this.cursor_.normals[0].clone();
			}
			
			var index = 0;
			//Find right index
			for (var i = 0; i < this.cursor_.rects.length; ++i) {
				var rect = this.cursor_.rects[i];
				if (PtInRect(this.position_, rect.p1, rect.p2, rect.p3, rect.p4)) {
					index = i;
					break;
				}
			}

			//Find a better direction
			if (index >= 0) {
				var nextCursor = this.cursor_.links[index];
				for (var i = 0; i < nextCursor.normals.length; ++i) {
					
					var vec = this.direction_.clone();
					vec.sub(nextCursor.normals[i]);
						
					if (vec.lengthSq() > MinDelta) {
						return nextCursor.normals[i].clone();
					}
				}
			}

			return null;
		}
    }

    reset() {
        this.direction_.set(0, 0, 0);
        this.map_ = null;
        this.index_ = 0;
        this.position_.set(0, 0, 0);
        this.turned_ = false;
        this.nodes_ = [];
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
		
		var pts = [originPoint.clone(), originPoint.clone(), originPoint.clone()];
		pts[0].sub(vecV).add(vecH);
		pts[1].sub(vecV).sub(vecH);
		pts[2].sub(vecV);

		const collisions = this.game.getCollisions();
		
		for (var i = 0; i < pts.length; ++i) {
			
			let ray = new THREE.Raycaster(pts[i],this.direction_.clone());
			let collisionResults = ray.intersectObjects(collisions);
			if (collisionResults.length > 0 && collisionResults[0].distance < this.size) {
				if (collisionResults[0].object.name === 'DIAMENT') {
					//this.changeDiamentPosition(collisionResults[0].object)
				} else {
					
					this.game.bumpWall(originPoint.clone());
					
					break;
				}
			}
		}
		
	}
}
