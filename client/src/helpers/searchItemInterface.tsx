export interface SearchItemInterface {
   // city: string;
    dates: {
      startDate: string;
      endDate: string;
    }[];
    options: {
      minPrice: number;
      maxPrice: number;
      adult: number;
      children: number;
      room: number;
    };
  }
  