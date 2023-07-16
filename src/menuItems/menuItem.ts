export interface BaseMenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
}

export interface MenuItem extends BaseMenuItem {
  id: number;
}
