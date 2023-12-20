export interface Student {
  id: string,
  name: string,
  email: string,
  phone: string,
  enrollNumber: string,
  dateOfAdmission: string,
}

export interface ConfigValidation {
  name: string[],
  email: string[],
  password: string[],
  phone: string[],
  enrollNumber: string[],
  dateOfAdmission: string[]
}

export interface User extends Student {
  password: string
}

export type PartialStudent = Partial<Student>

export type PartialConfigValidation = Partial<ConfigValidation>

export type PartialUser = Partial<User>
