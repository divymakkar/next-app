export interface AllDiscountsType {
  deduction_discounts: DiscountType[];
  thrillcash_discounts: DiscountType[];
  thrillcash_plus_discounts: DiscountType[];
}
export interface DiscountType {
  discount_string: string;
  terms_and_conditions: {
    min_booking_amt: string;
    max_discount_amt: string;
    date_of_travel: {
      start_date_of_travel: string;
      end_date_of_travel: string;
    };
    date_of_booking?: {
      start_date_of_booking: string;
      end_date_of_booking: string;
    };
  };
  code: string;
}
