

export interface RoomInterface {
roomId: number;
title: string;
price: number;
maxPeople: number;
description: string;
typeID: number;
hotelID: number;
number: number;
unavailable_dates: string;
[key: string]: number | string;
}
    
    