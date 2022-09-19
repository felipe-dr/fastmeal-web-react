export default function translateTermsToPtBr(text: string): string {
  switch (text) {
    case 'restaurants':
      return 'restaurantes';
    case 'menu':
      return 'cardápio';
    case 'reviews':
      return 'avaliações';
    default:
      return text;
  }
}
