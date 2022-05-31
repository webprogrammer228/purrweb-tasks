export type AuthInputs = {
  username: string;
  email: string;
  password: string;
  token: string;
};

export type LoginResponseType = {
  token: string;
  user: {
    email: string;
    id: number;
    username: string;
  };
};

export type User = {
  name: string;
  email: string;
};

export type PurchasedSubscription = {
  title: string;
  price: number;
  priceId: number | undefined;
};

export type SubscribeType = {
  userId: number | null;
  title?: string;
  price?: string;
  productId: number | null;
  currentPeriodStart: number | null;
  currentPeriodEnd: number | null;
  status: string;
  id: number | null;
};

export type SubscriptionsType = [MySubscription];

export type MySubscription = {
  id: number;
  userId: number;
  productId: number;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
  product: {
    id: number;
    sitesCount: number;
    name: string;
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

export type CheckboxesType = {
  code: string;
};

export type SettingsPersonalInfoType = {
  username: string;
  email: string;
};

export type SettingsPersonalInfoResponseType = {
  id: number;
  email: string;
  username: string;
  subscribes: [];
  codes: [
    {
      id: number;
      code: string;
      origin: string;
      status: string;
      subscribeId: number;
      subscribe: {
        id: number;
        userId: number;
        user: string;
        productId: number;
        product: {
          id: number;
          sitesCount: number;
          name: number;
          prices: [
            {
              id: number;
              isActive: boolean;
              productId: number;
              product: {};
              price: string;
            }
          ];
        };
        currentPeriodStart: string;
        currentPeriodEnd: string;
        status: string;
        codes: string[];
      };
      userId: number;
      user: string;
    }
  ];
};

export type SettingsPasswordType = {
  currentPassword: string;
  newPassword: string;
};

//styled components

export type SubscriptionTitleType = {
  color: string;
  fontWeight: string;
  lineHeight: string;
  fontSize: string;
  padding?: string;
  marginBottom?: string;
  validDate?: string;
};

export type ViewSubscriptionButtonType = {
  color: string;
  background: string;
  width?: string;
  height: string;
  margin?: string;
  minWidth?: string;

  mediumMargin?: string;
  isCode?: boolean;
};

export type SwiperNavigationType = {
  color?: string;
  marginRight?: string;
};

export type CheckboxType = {
  isActive: boolean;
};

export type SubscriptionWrapperPropsType = {
  index: number;
  activeIndex: number;
};

export type CodeStatusType = {
  color: string;
};

export type SubscriptionWrapperType = {
  padding: string;
  border?: string;
};

export type SubmitButtonType = {
  width: string;
  marginBottom?: string;
  smConfig?: boolean;
};

export type InputType = {
  width: string;
};

export type WrapperType = {
  direction?: string;
  align?: string;
  marginBottom?: string;
  justifyContent?: string;
  marginRight?: string;
  marginLeft?: string;
  marginMedium?: string;
  width?: string;
  order?: string;
  visible?: boolean;
  changeDirection?: boolean;
  noMargin?: boolean;
};
