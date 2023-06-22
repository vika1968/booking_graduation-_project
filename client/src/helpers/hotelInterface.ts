// export interface HotelInterface {
//     hotelID: number;
//     name: string;
//     type: string;
//     city: string;
//     address: string;
//     distance: string;
//     title: string;
//     description: string;
//     rating: number;
//     cheapestPrice: number;
//     featured: string | number;  
//     [key: string]: number | string;
//   }

// export interface HotelInterface {
//   hotelID: number;
//   name: string;
//   type: string;
//   city: string;
//   address: string;
//   distance: string;
//   title: string;
//   description: string;
//   rating: number;
//   cheapestPrice: number;
//   featured: string | number;
//   photos: {
//     photoID: string;
//     hotelID: number;
//   }[];
//   [key: string]: number | string | { photoID: string; hotelID: number }[] | string | number;
// }


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
 // photoID:number;
  [key: string]: number | string;
}
  
  