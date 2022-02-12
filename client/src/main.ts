import { Food } from "./Food";
import { Game } from "./Game";
import SocketHandler from "./SocketHandler";
import "./styles/index.scss";
import { convertImages } from "./assets/convertToSvg";
convertImages(".arrow img");

export const socket = new SocketHandler();
export const game = new Game();
export const food: Food = new Food(500, 500);
