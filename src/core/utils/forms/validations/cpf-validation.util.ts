export default function isValidCPF(cpfParam: string): boolean {
  let cpf: any;

  if (typeof cpfParam !== 'string') return false;

  cpf = cpfParam.replace(/[^\d]+/g, '');

  if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

  cpf = cpf.split('');

  const validator = cpf
    .filter(
      (digit: number, index: number, array: []) =>
        index >= array.length - 2 && digit
    )
    .map((digit: number) => Number(digit));

  const toValidate = (pop: number) =>
    cpf
      .filter(
        (digit: number, index: number, array: []) =>
          index < array.length - pop && digit
      )
      .map((digit: number) => +digit);

  const rest = (count: number, pop: number) =>
    ((toValidate(pop).reduce(
      (soma: number, el: number, i: number) => soma + el * (count - i),
      0
    ) *
      10) %
      11) %
    10;

  return !(rest(10, 2) !== validator[0] || rest(11, 1) !== validator[1]);
}
