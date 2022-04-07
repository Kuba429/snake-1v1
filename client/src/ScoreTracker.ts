import { game } from "./main";

export class ScoreTracker {
	playerScoreElement: HTMLElement;
	opponentScoreElement: HTMLElement;
	username: string;
	opponentUsername: string;
	constructor() {
		this.playerScoreElement = document.querySelector(".player.score")!;
		this.opponentScoreElement = document.querySelector(".opponent.score")!;
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
		if (
			this.playerScoreElement.textContent !=
			game.player.tail.length.toString()
		) {
			this.playerScoreElement.textContent = (
				game.player.tail.length - 2
			).toString();
		}
		if (
			this.opponentScoreElement.textContent !=
			game.enemy.tail.length.toString()
		) {
			this.opponentScoreElement.textContent = (
				game.enemy.tail.length - 2
			).toString();
		}
	}
}
