export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function validatePhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone)
}

export function validatePincode(pincode: string): boolean {
  return /^\d{6}$/.test(pincode)
}
