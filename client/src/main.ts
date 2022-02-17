import { Food } from "./Food";
import { Game } from "./Game";
import SocketHandler from "./SocketHandler";
import "./styles/index.scss";
import { convertImages } from "./assets/convertToSvg";
import { InfoScreen } from "./InfoScreen";
convertImages(".arrow img");

export const socket = new SocketHandler();
export const game = new Game();
export const food: Food = new Food(500, 500);
export const info: InfoScreen = new InfoScreen();
