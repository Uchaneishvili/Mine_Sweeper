export default class FormatData {
  static formatDigits(number: number) {
    return number.toString().padStart(3, '0')
  }
}
