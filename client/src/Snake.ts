interface block {
	x: number;
	y: number;
}
export class Snake {
	color: string;
	direction: string;
	x: number;
	y: number;
	ready: boolean;
	queue: string;
	tail: Array<block>;
	constructor(color: string, x: number, y: number) {
		this.color = color;
		this.direction = "ArrowUp";
		this.x = x;
		this.y = y;
		this.ready = true;
		this.queue = this.direction;
		this.tail = [
			{ x: this.x, y: this.y },
			{ x: this.x, y: this.y },
		];
	}
}
