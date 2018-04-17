export default class GameState {
	ready = false;
	start = false;

	StartGame() {
		this.start = true;
	}

	IsStart() {
		return this.start;
	}

	Ready() {
		this.ready = true;
	}

	IsReady() {
		return this.ready;
	}
}