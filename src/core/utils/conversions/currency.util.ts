export default function toBRL(value: number, hasSymbol = true): string {
  const convertedCurrency = value.toFixed(2).replace('.', ',');

  return hasSymbol ? `R$ ${convertedCurrency}` : convertedCurrency;
}
