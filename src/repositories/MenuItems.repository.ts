import { Service } from "typedi";

import { dbPool } from "../config/db.config";
import { BaseMenuItem, MenuItem } from "../types";
import { RowDataPacket } from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";
import { ResultSetHeader } from "mysql2";

interface MenuItemRecord extends MenuItem, RowDataPacket {}

@Service()
export class MenuItemsRepository {
  async findAll(): Promise<MenuItem[]> {
    const query = "SELECT * from menu_items";

    return new Promise((resolve, reject) => {
      dbPool.query<MenuItemRecord[]>(query, function (error, results) {
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }

  async find(id: number): Promise<MenuItem> {
    const query = "SELECT * from menu_items where id = ?;";

    return new Promise((resolve, reject) => {
      dbPool.query<MenuItemRecord[]>(
        {
          sql: query,
          values: [id],
        },
        function (error, results) {
          if (error) {
            reject(error);
          }
          resolve(results[0]);
        },
      );
    });
  }

  async create(newItem: BaseMenuItem): Promise<MenuItem> {
    const query =
      "INSERT INTO menu_items (name, price, description, image) VALUES (?, ?, ?, ?);";

    const { name, price, description, image } = newItem;

    return new Promise((resolve, reject) => {
      dbPool.query<ResultSetHeader>(
        {
          sql: query,
          values: [name, price, description, image],
        },
        function (error, results) {
          if (error) {
            reject(error);
          }

          resolve({
            id: results.insertId,
            ...newItem,
          });
        },
      );
    });
  }

  async update(id: number, itemUpdate: BaseMenuItem): Promise<MenuItem> {
    const query =
      "UPDATE menu_items SET name = ?, price= ?, description= ?, image= ? WHERE id = ?;";

    const { name, price, description, image } = itemUpdate;

    return new Promise((resolve, reject) => {
      dbPool.query<ResultSetHeader>(
        {
          sql: query,
          values: [name, price, description, image, id],
        },
        function (error, results) {
          if (error) {
            reject(error);
          }

          resolve({
            id,
            ...itemUpdate,
          });
        },
      );
    });
  }

  async remove(id: number): Promise<void> {
    const query = "DELETE FROM menu_items WHERE id=?;";

    return new Promise((resolve, reject) => {
      dbPool.query<ResultSetHeader>(
        {
          sql: query,
          values: [id],
        },
        function (error) {
          if (error) {
            reject(error);
          }

          resolve();
        },
      );
    });
  }
}
