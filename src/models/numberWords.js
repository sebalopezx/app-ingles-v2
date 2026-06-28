/**
 * Converts an integer to its English and Spanish word representation.
 * Covers 0–999,999. No JSON, no API — pure algorithm.
 */

const EN_ONES = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
]
const EN_TENS = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty',
  'sixty', 'seventy', 'eighty', 'ninety',
]

export function toEnglish(n) {
  if (n === 0) return 'zero'
  if (n < 20) return EN_ONES[n]
  if (n < 100) {
    const ones = EN_ONES[n % 10]
    return ones ? `${EN_TENS[Math.floor(n / 10)]}-${ones}` : EN_TENS[Math.floor(n / 10)]
  }
  if (n < 1000) {
    const rest = n % 100
    return rest
      ? `${EN_ONES[Math.floor(n / 100)]} hundred ${toEnglish(rest)}`
      : `${EN_ONES[Math.floor(n / 100)]} hundred`
  }
  const thousands = Math.floor(n / 1000)
  const rest = n % 1000
  return rest
    ? `${toEnglish(thousands)} thousand ${toEnglish(rest)}`
    : `${toEnglish(thousands)} thousand`
}

// 1-19 irregulars (includes dieciséis–diecinueve already compounded)
const ES_ONES = [
  'cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve',
  'diez', 'once', 'doce', 'trece', 'catorce', 'quince',
  'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve',
]
// 21-29 compound forms with their specific accents
const ES_TWENTIES = [
  '', 'veintiuno', 'veintidós', 'veintitrés', 'veinticuatro',
  'veinticinco', 'veintiséis', 'veintisiete', 'veintiocho', 'veintinueve',
]
const ES_TENS = [
  '', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta',
  'sesenta', 'setenta', 'ochenta', 'noventa',
]
// Hundreds are irregular in Spanish (500=quinientos, 700=setecientos, 900=novecientos)
const ES_HUNDREDS = [
  '', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos',
  'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos',
]

export function toSpanish(n) {
  if (n === 0) return 'cero'
  if (n < 20) return ES_ONES[n]
  if (n === 20) return 'veinte'
  if (n < 30) return ES_TWENTIES[n - 20]
  if (n < 100) {
    const rest = n % 10
    return rest ? `${ES_TENS[Math.floor(n / 10)]} y ${ES_ONES[rest]}` : ES_TENS[Math.floor(n / 10)]
  }
  if (n === 100) return 'cien'
  if (n < 1000) {
    const rest = n % 100
    return rest ? `${ES_HUNDREDS[Math.floor(n / 100)]} ${toSpanish(rest)}` : ES_HUNDREDS[Math.floor(n / 100)]
  }
  if (n === 1000) return 'mil'
  if (n < 2000) {
    const rest = n % 1000
    return rest ? `mil ${toSpanish(rest)}` : 'mil'
  }
  const thousands = Math.floor(n / 1000)
  const rest = n % 1000
  const prefix = `${toSpanish(thousands)} mil`
  return rest ? `${prefix} ${toSpanish(rest)}` : prefix
}

/** Strips accents and lowercases for lenient answer checking. */
export function normalizeAnswer(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/-/g, ' ')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}
