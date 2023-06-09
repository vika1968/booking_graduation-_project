export interface RoomInterface {
  roomId: number;
  title: string;
  price: number;
  maxPeople: number;
  description: string;
  hotelID: number;
  typeID: number;
  [key: string]: number | string;
}
