export default function phoneMask(
  eventParam: React.FormEvent<HTMLInputElement>
) {
  const { currentTarget } = eventParam;
  let { value } = currentTarget;

  currentTarget.maxLength = 15;
  value = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
  currentTarget.value = value;

  return eventParam;
}
