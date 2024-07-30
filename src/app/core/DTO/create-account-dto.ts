export interface CreateAccountDTO {
  firstName: string;
  lastName: string;
  email: string;
  phonenum: string;
  password?: string;
  roleId?: number;
}

