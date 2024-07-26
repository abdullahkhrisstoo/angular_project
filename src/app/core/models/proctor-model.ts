export interface CredentialProctor {
  credentialId?: number;
  email?: string;
  phonenum?: string;
}

export interface ProctorModel {
  userId: number;
  firstName?: string;
  lastName?: string;
  gender?: string;
  credentialId?: number;
  roleId?: number;
  stateId: number;
  createdAt: string;
  updatedAt: string;
  credential?: CredentialProctor;
}
