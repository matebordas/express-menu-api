import express from "express";
import * as ItemController from "../controllers/menuItems.controller";

const menuItemsRouter = express.Router();

const menuItemsRouteBase = '/menu/items';

menuItemsRouter.get(`${menuItemsRouteBase}/`, ItemController.getMenuItems)

menuItemsRouter.get(`${menuItemsRouteBase}/:id`, ItemController.getMenuItemById);

menuItemsRouter.post(`${menuItemsRouteBase}/`, ItemController.createMenuItem);

menuItemsRouter.put(`${menuItemsRouteBase}/:id`, ItemController.updateMenuItem);

menuItemsRouter.delete(`${menuItemsRouteBase}/:id`, ItemController.deleteMenuItem);

export {
  menuItemsRouter
}