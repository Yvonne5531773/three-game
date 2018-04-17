export default class CameraShift {
	camera_ = null;

	moveSpeed = new THREE.Vector3(0, 0, 0);
	rotateSpeed = new THREE.Vector3(0, 0, 0);

	SetCamera(camera) {
		this.camera_ = camera;
	}

	SetMoveSpeed(speed) {
		console.log("SetMoveSpeed:" + speed.x + "," + speed.y + "," + speed.z);
		this.moveSpeed.copy(speed);
	}

	SetRotateSpeed(speed) {
		console.log("SetRotateSpeed:" + speed.x + "," + speed.y + "," + speed.z);
		this.rotateSpeed.copy(speed);
	}

	Update(duration) {
		if (this.camera_ == null) return;
		var moveVec = this.moveSpeed.clone();
		moveVec.multiplyScalar(duration);
		this.camera_.position.add(moveVec);
		var rotateVec = this.rotateSpeed.clone();
		rotateVec.multiplyScalar(duration);
		this.camera_.rotation.x += rotateVec.x;
		this.camera_.rotation.y += rotateVec.y;
		this.camera_.rotation.z += rotateVec.z;
	}
}