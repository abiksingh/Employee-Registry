export interface IEmployee extends Document {
  name: string;
  email: string;
  password: string;
  matchPassword(password: string): boolean;
}

export interface IAddEmployee extends Document {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  role: string;
  comment: any;
}
