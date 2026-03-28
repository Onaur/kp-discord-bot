import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/index.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use("/api", router);

  return app;
}
