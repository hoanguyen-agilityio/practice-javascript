export interface Student {
  name?: string,
  email: string,
  phone: string,
  enrollNumber: string,
  dateOfAdmission?: string,
}

export interface LoginAccount {
  email: string,
  password: string
}

export interface ConfigValidation {
  email?: string[], 
  password?: string[],
  phone?: string[],
  enrollNumber?: string[],
  dateOfAdmission?: string[]
}

export interface ErrorMessage {
  name?: string,
  email?: string,
  phone?: string,
  enrollNumber?: string,
  dateOfAdmission?: string
  password?: string
}