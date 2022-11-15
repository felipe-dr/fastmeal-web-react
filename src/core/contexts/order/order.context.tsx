import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { OrderItem } from 'features/order/interfaces/order-item.interface';

import {
  OrderContextData,
  OrderContextReturn,
  OrderProviderProps,
} from './interfaces/order.interface';

const OrderContext = createContext<OrderContextData>({} as OrderContextData);

/**
 * Component responsible for providing the order context.
 *
 * @typedef {object} OrderProviderProps
 * @property {ReactNode} children
 * @returns {JSX.Element}
 */
export default function OrderProvider({
  children,
}: OrderProviderProps): JSX.Element {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [orderSubtotal, setOrderSubtotal] = useState<number>(0);
  const [orderTotal, setOrderTotal] = useState<number>(0);

  const value = useMemo(
    () => ({
      orderItems,
      setOrderItems,
      orderSubtotal,
      setOrderSubtotal,
      orderTotal,
      setOrderTotal,
    }),
    [orderItems, orderSubtotal, orderTotal]
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}

/**
 * Hook that manages states for items, subtotal, and order total, as well as
 * providing add, remove items and calculate total functions.
 *
 * @returns {OrderContextReturn}
 */
export function useOrderContext(): OrderContextReturn {
  if (useContext(OrderContext) === undefined) {
    throw new Error('useOrderContext must be used within a OrderProvider');
  }

  const {
    orderItems,
    setOrderItems,
    orderSubtotal,
    setOrderSubtotal,
    orderTotal,
    setOrderTotal,
  } = useContext(OrderContext);
  const shipping = 5;

  function changeItemQuantity(item: OrderItem, quantity: number): void {
    const updatedItem = item;

    updatedItem.quantity += quantity;
  }

  function changeItemSubtotal(item: OrderItem): void {
    const updatedItem = item;

    updatedItem.subtotal = item.quantity * item.price;
  }

  function addItem(item: OrderItem): void {
    const updatedOrderItems = [...orderItems];
    const itemAlreadyAdded = orderItems.find(
      (orderItem) => orderItem.id === item.id
    );

    if (itemAlreadyAdded) {
      changeItemQuantity(itemAlreadyAdded, 1);
      changeItemSubtotal(itemAlreadyAdded);
    } else {
      updatedOrderItems.push(item);
      changeItemQuantity(item, 1);
      changeItemSubtotal(item);
    }

    setOrderItems(updatedOrderItems);
  }

  function removeItem(item: OrderItem, isRemoveDirectly = false): void {
    let updatedOrderItems = [...orderItems];
    const itemAlreadyAdded = orderItems.find(
      (orderItem) => orderItem.id === item.id
    );

    if (itemAlreadyAdded?.quantity === 1 || isRemoveDirectly) {
      updatedOrderItems = orderItems.filter((orderItem) => {
        return orderItem.id !== itemAlreadyAdded?.id;
      });
    } else {
      changeItemQuantity(item, -1);
      changeItemSubtotal(item);
    }

    setOrderItems(updatedOrderItems);
  }

  function clearOrderItems(): void {
    setOrderItems([]);
  }

  function calcOrderSubtotal(): void {
    let subtotal = 0;

    orderItems.reduce((subtotalAcc, orderItem) => {
      subtotal = subtotalAcc + orderItem.subtotal;

      return subtotal;
    }, 0);

    setOrderSubtotal(subtotal);
  }

  function calcOrderTotal(): void {
    const total = orderSubtotal + shipping;

    setOrderTotal(total);
  }

  useEffect(() => {
    calcOrderSubtotal();
    calcOrderTotal();
  }, [orderItems, orderSubtotal]);

  return {
    shipping,
    orderItems,
    orderSubtotal,
    orderTotal,
    addItem,
    removeItem,
    clearOrderItems,
  };
}
