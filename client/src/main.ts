import SocketHandler from "./SocketHandler";
import "./styles/index.scss";

export const socket = new SocketHandler();
const canvas: HTMLCanvasElement = document.querySelector("#mainCanvas")!;
const ctx = canvas.getContext("2d");
console.log(ctx);
