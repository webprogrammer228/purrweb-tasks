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
  username: string;
  email: string;
  id?: number | null | undefined;
};

export type PurchasedSubscription = {
  title: string;
  price: number;
  priceId: number | undefined;
};
export type Subscribe = {
  userId: number;
  productId: number;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  status: string;
  id: number;
};

export type SubscribeType = Subscribe & {
  title?: string;
  price?: string;
};

export type AddedSubscription = {
  price: number;
  title: string;
  description: string;
  benefits: string[];
};

export type SubscriptionsType = [MySubscription];
//нужно разбивать этот тип на более мелкие: прайс, продукт, код
//далее эти мелкие типы можно использовать в SettingsPersonalInfoResponseType
//в MySubscription и SubscribeType 6 одинаковых полей из 8, можно вычленить общие поля и к ним уже добавлять новые поля через амперсанд
export type MySubscription = Subscribe & {
  product: Product;
  codes: Code[];
};

export type Product = {
  id: number;
  sitesCount: number;
  name: string;
  prices: Price[];
};

export type Price = {
  id: number;
  isActive: boolean;
  productId: number;
  price: string;
};

export type Code = {
  id: number;
  code: string;
  origin: null;
  status: string;
  subscribeId: number;
  userId: number;
};

export type CheckboxesType = {
  code: string;
};

export type SettingsResponseType = User & {
  subscribes: [];
  codes: [
    Code & { user: string } & {
      subscribe: Subscribe & {
        user: string;
        codes: Code[];
        product: Omit<Product, "prices"> & {
          prices: [Price & { product: {} }];
        };
      };
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
