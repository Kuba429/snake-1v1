import { game } from "./main";

export class ScoreTracker {
	username: string;
	opponentUsername: string;
	constructor() {
		this.username =
			localStorage.getItem("username")?.substring(0, 15) || "Guest";
		this.opponentUsername = "Opponent";
		this.updateUsernames();
	}
	updateUsernames() {
		document.querySelector(".username.player")!.textContent = this.username;
		document.querySelector(".username.opponent")!.textContent =
			this.opponentUsername;
	}
	updateScores() {
		document.querySelector(".player.score")!.textContent = (
			game.player.tail.length - 2
		).toString();
		document.querySelector(".opponent.score")!.textContent = (
			game.enemy.tail.length - 2
		).toString();
	}
}
