export interface User {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: 'male' | 'female';
  country: string;
  agreement: boolean;
  picture: {
    base64: string;
    size: number;
    type: string;
  } | null;
  timestamp: number;
}
