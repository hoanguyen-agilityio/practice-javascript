export interface Student {
  name?: string,
  email: string,
  phone?: string,
  enrollNumber?: string,
  dateOfAdmission?: Date,
  password?: string
}

export interface ConfigValidation {
  email: string[], 
  password: string[]
}
