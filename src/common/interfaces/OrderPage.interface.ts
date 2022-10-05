import { DiscountType } from "@/components/DiscountsCard/interface";

export interface OrderPageProps {
  data: OrderPageType;
  error: any;
}
export interface OrderPageType {
  order_ref: string;
  customer_id: number;
  amount: string;
  currency: string;
  payments: any;
  bookings: BookingType[];
  utm_param: null;
}

interface BookingType {
  pnr: string;
  name: string;
  description: string;
  product_id: number;
  variant_id: number;
  type: string;
  amount: string;
  date_of_travel: string;
  product: ProductType;
  booked_inventories: BookedInventoryType[];
  booked_item_payments: BookedItemPayment[];
  passengers: PassengerType[];
  booking_line_items: BookingLineItemType[];
  created_at: string;
  booking_expiry_seconds: number;
  paid_amount: string;
  booking_end_date?: string;
  customer_pickup_point: any;
  customer_drop_point: any;
  can_pay_at_venue: boolean;
  mandatory_pay_at_venue: boolean;
  pay_at_venue_enabled: boolean;
  amount_for_reserving: string;
  amount_to_pay_at_venue: number;
  state: string;
  number_of_passengers: number;
  third_party_services: any;
  refund_protect_service_enabled: boolean;
  base_booking_pnr: string;
  currency: string;
  authorized_amount: number;
  customer_starting_point: string;
  can_be_cancelled: boolean;
  variant_has_time_slots: boolean;
  checkout_date?: string;
  checkin_date?: string;
}

export interface BookingLineItemType {
  id: number;
  name: string;
  type: string;
  unit_price: string;
  quantity: 3;
  amount: string;
  no_of_adults?: number;
  no_of_children?: number;
  strike_through_percentage: number;
  strike_through_amount: string;
  code?: string;
  currency: string;
}
interface PassengerType {
  first_name: string;
  last_name: string;
  email: string;
  phone_country_code: string;
  phone: string;
  is_primary_passenger: true;
}
interface BookedItemPayment {
  id: number;
  state: string;
  amount: string;
  paid_amount: string;
  due_date: string;
  pay_to: string;
  currency: string;
}

interface ProductType {
  name: string;
  slug: string;
  location: string;
  featured_media: any;
  product_type: string;
  variant_name: string;
  variant_duration: {
    days: number;
    nights: number;
  };
  discounts: {
    deduction_discounts: DiscountType[];
    thrillcash_discounts: DiscountType[];
    thrillcash_plus_discounts: DiscountType[];
  };
  pickup_points: [
    {
      id: number;
      lat: string;
      long: string;
      name: string;
      long_name: string;
      type: string;
      landmark: any;
      directions: any;
      google_data: {
        url: string;
        formatted_address: string;
      };
    }
  ];
  drop_points: [
    {
      id: number;
      lat: string;
      long: string;
      name: string;
      long_name: string;
      type: string;
      landmark: string;
      directions: string;
      google_data: {
        url: string;
        formatted_address: string;
      };
    }
  ];
  pickup_drop_point_selection: true;
}

interface BookedInventoryType {
  id: number;
  description: string;
  inventory_name: string;
  unit_price: string;
  quantity: number;
  no_of_seats: number;
  amount: string;
  bookable_inventory_id: number;
  no_of_adults?: number;
  no_of_children?: number;
}

export interface BookedItemsType {
  id: number;
  name: string;
  type: string;
  unit_price: string;
  quantity: number;
  amount: string;
  no_of_adults?: number | null;
  no_of_children?: number | null;
  strike_through_percentage: number;
  strike_through_amount: string;
  code?: string | null;
  currency: string;
}

export interface SurchargeType {
  id: number;
  name: string;
  type: string;
  unit_price: string;
  quantity: number;
  amount: string;
  no_of_adults?: number;
  no_of_children?: number;
  strike_through_percentage: number;
  strike_through_amount: string;
  code?: string;
  currency: string;
}
export interface OrderDescriptionType {
  bookingName: string;
  product: {
    product_type: string;
    location: string;
    variantName: string;
  };
  bookingDuration: {
    dateOfTravel: string;
    checkInDate?: string;
    checkOutDate?: string;
    bookingEndDate?: string;
    duration: any;
    ifHasTimeSlot: boolean;
  };
}
