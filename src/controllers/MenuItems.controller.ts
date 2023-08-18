import { Service } from "typedi";
import { Request, Response } from "express";

import { MenuItem, BaseMenuItem } from "../types";
import { MenuItemsService } from "../services/MenuItems.service";

const DEFAULT_ERROR_MESSAGE = "An error occurred";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return DEFAULT_ERROR_MESSAGE;
}

function logError(error: unknown) {
  if (error instanceof Error) {
    console.log(error.stack);
  }

  console.log(DEFAULT_ERROR_MESSAGE);
}

@Service()
export class MenuItemsController {
  private menuItemsService: MenuItemsService;

  constructor(menuItemsService: MenuItemsService) {
    this.menuItemsService = menuItemsService;
    this.findAll.bind(this);
  }

  async findAll(req: Request, res: Response) {
    try {
      const items: MenuItem[] = await this.menuItemsService.findAll();

      res.status(200).send(items);
    } catch (e) {
      logError(e);
      const errorMessage = getErrorMessage(e);
      res.status(500).send(errorMessage);
    }
  }

  async find(req: Request, res: Response) {
    const id: number = parseInt(req.params.id, 10);

    try {
      const item: MenuItem = await this.menuItemsService.find(id);

      if (item) {
        res.status(200).send(item);
        return;
      }

      res.status(404).send("item not found");
    } catch (e: unknown) {
      logError(e);
      const errorMessage = getErrorMessage(e);
      res.status(500).send(errorMessage);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const item: BaseMenuItem = req.body;

      const newItem = await this.menuItemsService.create(item);

      res.status(201).json(newItem);
    } catch (e: unknown) {
      logError(e);
      const errorMessage = getErrorMessage(e);
      res.status(500).send(errorMessage);
    }
  }

  async update(req: Request, res: Response) {
    const id: number = parseInt(req.params.id, 10);

    try {
      const itemUpdate: MenuItem = req.body;

      const existingItem: MenuItem = await this.menuItemsService.find(id);

      if (existingItem) {
        const updatedItem = await this.menuItemsService.update(id, itemUpdate);
        res.status(200).json(updatedItem);
        return;
      }

      const newItem = await this.menuItemsService.create(itemUpdate);

      res.status(201).json(newItem);
    } catch (e: unknown) {
      logError(e);
      const errorMessage = getErrorMessage(e);
      res.status(500).send(errorMessage);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id: number = parseInt(req.params.id, 10);
      await this.menuItemsService.remove(id);

      res.sendStatus(204);
    } catch (e: unknown) {
      logError(e);
      const errorMessage = getErrorMessage(e);
      res.status(500).send(errorMessage);
    }
  }
}
