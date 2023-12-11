export interface Student {
  id?: string,
  name?: string,
  email?: string,
  phone?: string,
  enrollNumber?: string,
  dateOfAdmission?: string,
  password?: string 
}

export interface ConfigValidation {
  name?: string[],
  email?: string[], 
  password?: string[],
  phone?: string[],
  enrollNumber?: string[],
  dateOfAdmission?: string[]
}
