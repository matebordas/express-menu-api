import express, { Request, Response } from "express";
import * as ItemService from "../services/menuItems.service";

import { MenuItem, BaseMenuItem } from "../types";

export const itemsRouter = express.Router();

export async function getMenuItems(req: Request, res: Response) {
  try {
    const items: MenuItem[] = await ItemService.findAll();

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function getMenuItemById(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: MenuItem = await ItemService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("item not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function createMenuItem(req: Request, res: Response) {
  try {
    const item: BaseMenuItem = req.body;

    const newItem = await ItemService.create(item);

    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function updateMenuItem(req: Request, res: Response) {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: MenuItem = req.body;

    const existingItem: MenuItem = await ItemService.find(id);

    if (existingItem) {
      const updatedItem = await ItemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

export async function deleteMenuItem(req: Request, res: Response) {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
}
