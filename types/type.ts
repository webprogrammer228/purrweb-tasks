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

export type SubscriptionType = {
  title?: string;
  price?: number;
  priceId?: number | undefined;
};

export type SubscriptionWrapperType = {
  padding: string;
};

export type SubmitButtonType = {
  width: string;
  marginBottom?: string;
};

export type InputType = {
  width: string;
};

export type WrapperType = {
  direction: string;
  align: string;
  marginBottom?: string;
};

export type SettingsMenuTitleType = {
  activeTitle: boolean;
};

export type SubscribeType = {
  userId: number | null;
  productId: number | null;
  currentPeriodStart: number | null;
  currentPeriodEnd: number | null;
  status: string;
  id: number | null;
};

export type SubscriptionsType = [
  {
    id: number;
    userId: number;
    productId: number;
    currentPeriodStart: string;
    currentPeriodEnd: string;
    status: string;
    product: {
      id: 3;
      sitesCount: 7;
      name: "Seven sites";
      prices: [
        {
          id: number;
          isActive: boolean;
          productId: number;
          price: string;
        }
      ];
    };
    codes: [
      {
        id: number;
        code: string;
        origin: null;
        status: string;
        subscribeId: number;
        userId: number;
      }
    ];
  }
];
