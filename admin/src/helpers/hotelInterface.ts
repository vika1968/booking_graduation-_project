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
    cheapestPrice: number;
    featured: string | number;  
    [key: string]: number | string;
  }
  