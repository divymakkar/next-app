import { RequestInventory, ResponseInventory } from "./Inventory.interface";

export interface ResponseBooking {
  pnr: string;
  name: string;
  description: string;
  product_id: number;
  variant_id: number;
  type: string;
  amount: string;
  total_vendor_payment: string;
  date_of_travel: string;
  booked_inventories: ResponseInventory[];
  booked_item_payments: any[];
}

export interface RequestBooking {
  booking_type: string;
  product_id: number;
  variant_id: number | null; //TODO
  date_of_travel: string;
  time_slot?: string;
  inventories: RequestInventory[];
  booking_end_date?: string;
}
