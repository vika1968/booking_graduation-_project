export interface SearchItemInterface {
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
  