import "reflect-metadata";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

import { menuItemsRouter } from "./routers/menuItems.router";

const routesBase = "api";
app.use(`/${routesBase}`, menuItemsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
