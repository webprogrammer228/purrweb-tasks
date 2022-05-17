export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
};

export type LoginInputs = {
  username: string;
  password: string;
};

export type Errors = {
  message: string[];
};
