export interface HotelInterface {
  hotelID: number;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  title: string;
  description: string;
  rating: number;
  cheapestPrice: number | 0;
  featured: string | number;
  photo:string;
  [key: string]: number | string;
}
  
  