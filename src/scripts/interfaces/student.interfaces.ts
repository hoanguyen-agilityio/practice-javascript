export interface Student {
  name: string,
  email: string,
  phone: string,
  enrollNumber: string,
  dateOfAdmission: Date,
}

export interface LoginAccount {
  email: string,
  password: string
}

export interface ConfigValidation {
  email: string[], 
  password: string[]
}
