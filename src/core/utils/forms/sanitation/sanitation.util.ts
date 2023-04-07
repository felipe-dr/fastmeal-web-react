export function replaceThingToEmpty(text: string, thing: string): string {
  return text.replaceAll(thing, '');
}

export function sanitizePhone(text: string): string {
  return text.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '');
}

export function sanitizeField(text: string): string {
  let sanitizedField = replaceThingToEmpty(text, '.');

  sanitizedField = replaceThingToEmpty(sanitizedField, '-');

  return sanitizedField.trim();
}
