import express from "express";
import * as ItemController from "./menuItems.controller";

export const itemsRouter = express.Router();

// GET items/
itemsRouter.get("/", ItemController.getMenuItems)

// GET items/:id
itemsRouter.get("/:id", ItemController.getMenuItemById);

// POST items
itemsRouter.post("/", ItemController.createMenuItem);

// PUT items/:id
itemsRouter.put("/:id", ItemController.updateMenuItem);

// DELETE items/:id
itemsRouter.delete("/:id", ItemController.deleteMenuItem);