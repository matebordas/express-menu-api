import Container from "typedi";
import express, { RequestHandler } from "express";
import { MenuItemsController } from "../controllers/MenuItems.controller";

const menuItemsRouter = express.Router();
const ROUTES_BASE = "/menu/items";

const requestNameToMethodMap = {
  GET: "get",
  POST: "post",
  PUT: "put",
  PATCH: "patch",
  DELETE: "delete",
} as const;

function route(
  methodName: keyof typeof requestNameToMethodMap,
  subpath: string,
  callback: RequestHandler,
) {
  const method = requestNameToMethodMap[methodName];
  menuItemsRouter[method](`${ROUTES_BASE}${subpath}`, callback);
}

const menuItemsController = Container.get(MenuItemsController);

route("GET", `/`, menuItemsController.findAll.bind(menuItemsController));
route("GET", `/:id`, menuItemsController.find.bind(menuItemsController));
route("POST", `/`, menuItemsController.create.bind(menuItemsController));
route("PUT", `/:id`, menuItemsController.update.bind(menuItemsController));
route("DELETE", `/:id`, menuItemsController.delete.bind(menuItemsController));

export { menuItemsRouter };
