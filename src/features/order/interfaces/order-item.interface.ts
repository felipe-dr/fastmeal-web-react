const temp = '/images/foods/burger.png';

export interface OrderItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  subtotal: number;
  imagePath: string;
}

// !! TEMP
export const orderItems: OrderItem[] = [
  {
    id: 1,
    name: 'Pão artesanal italiano',
    description: 'Pão artesanal com queijos italianos',
    quantity: 1,
    price: 15.9,
    subtotal: 15.9,
    imagePath: temp,
  },
  {
    id: 2,
    name: 'Donut',
    description: 'Coberto com chantilly',
    quantity: 4,
    price: 2.5,
    subtotal: 10.2,
    imagePath: temp,
  },
  {
    id: 3,
    name: 'Donut',
    description: 'Coberto com chantilly',
    quantity: 4,
    price: 2.5,
    subtotal: 10.2,
    imagePath: temp,
  },
];
