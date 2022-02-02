import { Game } from "./Game";
import SocketHandler from "./SocketHandler";
import "./styles/index.scss";

export const socket = new SocketHandler();
export const game = new Game();
requestAnimationFrame(game.getNextFrame);
