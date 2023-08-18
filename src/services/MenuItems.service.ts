import { Service } from "typedi";
import { MenuItemsRepository } from "../repositories/MenuItems.repository";
import { BaseMenuItem, MenuItems, MenuItem } from "../types";

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
    return await this.menuItemsRepository.find(id);
  }

  async create(newItem: BaseMenuItem): Promise<MenuItem> {
    return await this.menuItemsRepository.create(newItem);
  }

  async update(id: number, itemUpdate: BaseMenuItem): Promise<MenuItem> {
    const item = await this.find(id);

    if (!item) {
      throw Error(`No item found with id ${id}`);
    }

    return await this.menuItemsRepository.update(id, itemUpdate);
  }

  async remove(id: number): Promise<void> {
    const item = await this.find(id);

    if (!item) {
      throw Error(`No item found with id ${id}`);
    }

    return await this.menuItemsRepository.remove(id);
  }
}
