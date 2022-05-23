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

export type Subscription = {
  title?: string;
  price?: number;
  priceId?: number | undefined;
};

export type SubscriptionWrapperType = {
  padding: string;
  border?: string;
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
  justifyContent?: string;
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
    currentPeriodStart: string | number;
    currentPeriodEnd: string | number;
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

export type SubscriptionType = {
  info: SubscriptionsType;
};

export type AllMySubscriptions = {
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
};

export type SubscriptionTitleType = {
  color: string;
  fontWeight: string;
  lineHeight: string;
  fontSize: string;
  padding?: string;
};

export type ViewSubscriptionButtonType = {
  color: string;
  background: string;
  width: string;
  height: string;
};

export type SwiperNavigationType = {
  color?: string;
  marginRight?: string;
};
