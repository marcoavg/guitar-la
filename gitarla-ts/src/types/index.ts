export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}


export type GitarProps = {
    guitar: Guitar;
    addToCart: (item: Guitar) => void;
}

export type CartItem = Guitar & {
    quantity?: number | 0;
}


export interface CartProps extends Guitar {
    quantity?: number | 0;
} 

export type CartItemTypes = Pick<Guitar, 'id' | 'name' | 'price' | 'image'> & {
    quantity: number;
}
