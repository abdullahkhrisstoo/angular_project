export interface UpdatePasswordDTO {
  credentialId: number;
  lastPassword: string;
  newPassword: string;
  confirmPassword: string;
}
