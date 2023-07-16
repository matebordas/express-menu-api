import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { menuItemsRouter } from "./menuItems/menuItems.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/menu/items", menuItemsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
