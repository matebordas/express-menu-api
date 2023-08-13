import {dbPool} from "../config/db.config";
import {MenuItem} from "../types";
import {RowDataPacket} from "mysql2/typings/mysql/lib/protocol/packets/RowDataPacket";

interface MenuItemRecord extends MenuItem, RowDataPacket {}

async function selectAll(): Promise<MenuItem[]> {
  const query = 'SELECT * from menu_items';

  return new Promise((resolve, reject)=> {
    dbPool.query<MenuItemRecord[]>(query, function (error, results) {
      if (error) {
        reject(error)
      }
      resolve(results);
    });
  });
}

export {
  selectAll
}
