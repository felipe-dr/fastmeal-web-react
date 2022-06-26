export default function stringToBoolean(value: string) {
  return value === 'false' ||
    value === 'undefined' ||
    value === 'null' ||
    value === '0'
    ? false
    : !!value;
}
