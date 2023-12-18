export interface Student {
  id: string,
  name: string,
  email: string,
  phone: string,
  enrollNumber: string,
  dateOfAdmission: string,
}

export interface LoginAccount {
  email: string,
  password: string
}

export interface ConfigValidation {
  name: string[],
  email: string[],
  password: string[],
  phone: string[],
  enrollNumber: string[],
  dateOfAdmission: string[]
}

export interface ErrorMessage extends Student {
  password: string
}

export type PartialStudent = Partial<Student>

export type PartialConfigValidation = Partial<ConfigValidation>

export type PartialErrorMessage = Partial<ErrorMessage>
