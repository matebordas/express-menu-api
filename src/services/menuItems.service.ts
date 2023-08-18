import { Service } from "typedi";
import { MenuItemsRepository } from "../repositories/MenuItems.repository";
import { BaseMenuItem, MenuItems, MenuItem } from "../types";

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

@Service()
export class MenuItemsService {
  menuItemsRepository: MenuItemsRepository;

  constructor(menuItemsRepository: MenuItemsRepository) {
    this.menuItemsRepository = menuItemsRepository;
  }

  async findAll(): Promise<MenuItem[]> {
    return await this.menuItemsRepository.findAll();
  }

  async find(id: number): Promise<MenuItem> {
    return items[id];
  }

  async create(newItem: BaseMenuItem): Promise<MenuItem> {
    const id = new Date().valueOf();

    items[id] = {
      id,
      ...newItem,
    };

    return items[id];
  }

  async update(id: number, itemUpdate: BaseMenuItem): Promise<MenuItem | null> {
    const item = await this.find(id);

    if (!item) {
      return null;
    }

    items[id] = { id, ...itemUpdate };

    return items[id];
  }

  async remove(id: number): Promise<null | void> {
    const item = await this.find(id);

    if (!item) {
      return null;
    }

    delete items[id];
  }
}
