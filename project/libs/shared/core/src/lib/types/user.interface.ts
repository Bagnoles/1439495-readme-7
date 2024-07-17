export interface User {
  id?: string;
  email: string;
  passwordHash: string;
  name: string;
  avatar?: string;
  dateOfRegistry: Date;
}
