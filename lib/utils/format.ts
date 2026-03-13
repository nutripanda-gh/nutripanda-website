/**
 * Format paise amount to INR display string.
 * e.g. 49900 → "₹499.00"
 */
export function formatPrice(paise: number): string {
  return `₹${(paise / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
