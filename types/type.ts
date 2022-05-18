export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  token: string;
};

export type LoginInputs = {
  email: string;
  password: string;
};

export type Errors = {
  message: string[];
};

export type ErrorType = {
  data: string;
};
