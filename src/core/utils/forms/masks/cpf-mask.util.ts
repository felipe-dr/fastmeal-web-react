export default function cpfMask(eventParam: React.FormEvent<HTMLInputElement>) {
  const { currentTarget } = eventParam;
  let { value } = currentTarget;

  currentTarget.maxLength = 14;
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  currentTarget.value = value;

  return eventParam;
}
