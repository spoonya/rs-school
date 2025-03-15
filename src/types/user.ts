export interface Picture {
  base64: string;
  size: number;
  type: string;
}

export interface UserFormData {
  name: string;
  age: number | undefined;
  email: string;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: 'male' | 'female';
  country: string;
  agreement: boolean;
  picture: Picture | null;
  timestamp?: number;
}
