import { BaseMenuItem, MenuItems, MenuItem } from "../types";
import * as MenuItemDAO from "../DAOs/menuItems.dao";

const items: MenuItems = {
  1: {
    id: 1,
    name: "Burger",
    price: 599,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png",
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 299,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png",
  },
  3: {
    id: 3,
    name: "Tea",
    price: 199,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png",
  },
};

export const findAll = async (): Promise<MenuItem[]> => {
  return await MenuItemDAO.selectAll();
};

export const find = async (id: number): Promise<MenuItem> => items[id];

export const create = async (newItem: BaseMenuItem): Promise<MenuItem> => {
  const id = new Date().valueOf();

  items[id] = {
    id,
    ...newItem,
  };

  return items[id];
};

export const update = async (
  id: number,
  itemUpdate: BaseMenuItem,
): Promise<MenuItem | null> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  items[id] = { id, ...itemUpdate };

  return items[id];
};

export const remove = async (id: number): Promise<null | void> => {
  const item = await find(id);

  if (!item) {
    return null;
  }

  delete items[id];
};
