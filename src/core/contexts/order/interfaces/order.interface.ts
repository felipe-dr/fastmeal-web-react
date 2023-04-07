import React, { ReactNode } from 'react';

import { OrderItem } from 'features/order/interfaces/order-item.interface';

export interface OrderContextData {
  orderItems: OrderItem[];
  setOrderItems: React.Dispatch<React.SetStateAction<OrderItem[]>>;
  orderItemsQuantity: number;
  setOrderItemsQuantity: React.Dispatch<React.SetStateAction<number>>;
  orderSubtotal: number;
  setOrderSubtotal: React.Dispatch<React.SetStateAction<number>>;
  orderTotal: number;
  setOrderTotal: React.Dispatch<React.SetStateAction<number>>;
}

export interface OrderContextReturn {
  shipping: number;
  orderItems: OrderItem[];
  orderItemsQuantity: number;
  orderSubtotal: number;
  orderTotal: number;
  addItem: (item: OrderItem) => void;
  removeItem: (item: OrderItem, isRemoveDirectly?: boolean) => void;
  clearOrderItems: (hasMessage?: boolean) => void;
}

export interface OrderProviderProps {
  children: ReactNode;
}
