export interface RequestInventory {
  id: number;
  no_of_passengers: number;
  no_of_adults?: number;
  no_of_children?: number;
}

export interface ResponseInventory {
  id: number;
  description: string;
  amount: string;
  vendor_payable_amount: string;
  quantity: number;
  no_of_seats: number;
  inventory_name: string;
  unit_price: string;
  bookable_inventory_id: number;
}
