export class Codec {
  private shift: number;

  constructor() {
    this.shift = 3;
  }

  // Codificar el texto
  encode(text: string): string {
    return this.transform(text, this.shift);
  }

  // Decodificar el texto
  decode(text: string): string {
    return this.transform(text, -this.shift);
  }

  // Método para transformar el texto con un desplazamiento dado
  private transform(text: string, shift: number): string {
    return text
      .split('')
      .map((char) => {
        if (char >= 'A' && char <= 'Z') {
          return String.fromCharCode(
            ((((char.charCodeAt(0) - 65 + shift) % 26) + 26) % 26) + 65
          );
        } else if (char >= 'a' && char <= 'z') {
          return String.fromCharCode(
            ((((char.charCodeAt(0) - 97 + shift) % 26) + 26) % 26) + 97
          );
        } else if (char >= '0' && char <= '9') {
          return String.fromCharCode(
            ((((char.charCodeAt(0) - 48 + shift) % 10) + 10) % 10) + 48
          );
        } else {
          return char; // No transforma caracteres especiales
        }
      })
      .join('');
  }
}
