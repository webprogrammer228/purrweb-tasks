export type RegisterInputs = {
  username: string;
  email: string;
  password: string;
  token: string;
};

export type LoginInputs = {
  email: string;
  password: string;
  token: string;
};

export type User = {
  name: string;
  email: string;
};

export type Subscriptions = { title: string; price: number }[];

export type SubscriptionWrapperType = {
  padding: string;
};

export type SubmitButtonType = {
  width: string;
};
