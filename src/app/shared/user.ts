export class User {
    // id: number;
    username: string;
    password: string;
    // firstName: string;
    // lastName: string;
    email:string;
    phno:Number;
    token?: string;
    isActive:boolean;
    isSeller:boolean
}

export class Item{
    is_available:boolean
    item_desc: string
    item_image: string
    item_name: string
    item_price: number
    item_seller: string
    url: string
}