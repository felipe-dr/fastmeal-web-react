export function setItemLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function removeItemsLocalStorage(keys: string[]): void {
  keys.forEach((key) => localStorage.removeItem(key));
}

export function getItemLocalStorage(key: string): string | null {
  return localStorage.getItem(key);
}

export function hasItemLocalStorage(key: string): boolean {
  return !!getItemLocalStorage(key);
}
