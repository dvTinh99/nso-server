import WebSocket, { WebSocketServer } from "ws";

import env from "dotenv";
env.config();

import app from "./api.js";
