import express from "express";
import * as ItemController from "./menuItems.controller";

export const menuItemsRouter = express.Router();

menuItemsRouter.get("/", ItemController.getMenuItems)

menuItemsRouter.get("/:id", ItemController.getMenuItemById);

menuItemsRouter.post("/", ItemController.createMenuItem);

menuItemsRouter.put("/:id", ItemController.updateMenuItem);

menuItemsRouter.delete("/:id", ItemController.deleteMenuItem);