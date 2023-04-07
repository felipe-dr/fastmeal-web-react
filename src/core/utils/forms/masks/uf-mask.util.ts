import formValidationsRegex from 'core/constants/regex.constant';

export default function ufMask(eventParam: React.FormEvent<HTMLInputElement>) {
  const { currentTarget } = eventParam;
  let { value } = currentTarget;

  currentTarget.maxLength = 2;
  value = value.replace(formValidationsRegex.ONLY_LETTERS_WITHOUT_ACCENTS, '');
  currentTarget.value = value;

  return eventParam;
}
