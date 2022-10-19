export interface LoginTypes {
    email: string;
    password: string;
}

export interface UserTypes {
    id: string;
    email: string;
    name: string;
}

export interface JWTPayloadTypes {
    player: UserTypes;
    iat: number;
}

export interface Tables {
    id: number;
    name: string;
    guest_number: string;
    status: string;
}

export interface Foods {
    id: string;
    name: string;
    type: string;
    status: boolean;
    price: number;
}

export interface Orders {
    id: string;
    order_number: string;
    table: string;
    status: string;
    total_food: string;
    total_price: string;
}

export interface FoodCreateTypes {
    name: string;
    type: string;
    price: string;
    status: boolean;
}