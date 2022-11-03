export default function cepMask(eventParam: React.FormEvent<HTMLInputElement>) {
  const { currentTarget } = eventParam;
  let { value } = currentTarget;

  currentTarget.maxLength = 9;
  value = value.replace(/\D/g, '').replace(/^(\d{5})(\d)/, '$1-$2');
  currentTarget.value = value;

  return eventParam;
}
