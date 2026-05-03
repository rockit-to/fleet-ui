// Payment methods enum
export const CheckoutPaymentTab = {
  CreditCard: "creditcard",
  PayPal: "paypal",
  BankTransfer: "banktransfer",
  ApplePay: "applepay",
} as const;

export type CheckoutPaymentTab =
  (typeof CheckoutPaymentTab)[keyof typeof CheckoutPaymentTab];

// Guest types enum
export const GuestType = {
  Adults: "adults",
  Children: "children",
  Babies: "babies",
} as const;

export type GuestType = (typeof GuestType)[keyof typeof GuestType];

// Currency enum
export const Currency = {
  USD: "USD",
  EUR: "EUR",
  GBP: "GBP",
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];

// Form field names
export const CreditCardFields = {
  CardNumber: "cardNumber",
  CardHolder: "cardHolder",
  ExpirationDate: "expirationDate",
  CVC: "cvc",
} as const;

export const PayPalFields = {
  Login: "login",
  Password: "password",
} as const;

// Date format constants
export const DateFormats = {
  SHORT: "MMM DD",
  LONG: "MMM DD, YYYY",
  ISO: "YYYY-MM-DD",
} as const;

// Validation constants
export const ValidationRules = {
  MIN_ADULTS: 1,
  MAX_GUESTS: 16,
  MIN_NIGHTS: 1,
  MAX_NIGHTS: 365,
} as const;

// Interface definitions
export interface PriceCalculation {
  subtotal: number;
  discount: number;
  serviceFee: number;
  cleaningFee: number;
  taxes: number;
  total: number;
}

export interface GuestCounts {
  [GuestType.Adults]: number;
  [GuestType.Children]: number;
  [GuestType.Babies]: number;
}

export interface BookingDates {
  checkIn: string;
  checkOut: string;
}

// Additional utility types
export interface ContactOption {
  value: string;
  label: string;
}

export interface DateRange {
  start: string;
  end: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export type AsyncState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export interface PaymentFormData {
  cardNumber?: string;
  cardHolder?: string;
  expirationDate?: string;
  cvc?: string;
  email?: string;
  password?: string;
  message?: string;
  saveCard?: boolean;
  savePaypal?: boolean;
}

export interface Property {
  id: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  mainImage: string;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  reviewsCount: number;
}

export interface Pricing {
  basePrice: number;
  currency: Currency;
  discountPercentage: number;
  serviceFeePercentage: number;
  taxPercentage: number;
  cleaningFee: number;
}

export interface BookingData {
  property: Property;
  booking: {
    checkIn: string;
    checkOut: string;
    guests: GuestCounts;
    nights: number;
  };
  pricing: Pricing;
}

// API specific types
export interface PaymentRequest {
  method: string;
  amount: number;
  bookingId: string;
  paymentDetails?: PaymentFormData;
}

export interface PaymentResponse {
  success: boolean;
  confirmationId?: string;
  error?: string;
}
