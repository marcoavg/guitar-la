import { formatCurrency } from "../helpers";
import type { OrderItem } from "../types";

type OrderContentsProps = {
    order: OrderItem[];
    removeItem: (id: number) => void;
};


export default function OrderContents({ order, removeItem }: OrderContentsProps) {
    return (
        <div>
            <h2 className='font-black text-white text-4xl text-center'>Consumo</h2>
            <div className="space-y-3 mt-5">
                {order.length === 0 ? (
                    <p className="text-center text-white">No hay elementos en el pedido</p>
                ) : (
                    <div>
                        {order.map(item => (
                            <div key={item.id} className="border-t border-white pb-5 flex justify-between items-center py-5 last-of-type:border-b">
                                <div>
                                <p className="text-lg text-white">{item.name} - {formatCurrency(item.price)}</p>
                                <p className="text-sm text-gray-100 font-black">Cantidad: {item.quantity} {formatCurrency(item.price * item.quantity)}</p>
                                </div>
                                <button 
                                    className="text-red-500 hover:text-red-700 h-8 w-8 rounded-full text-sm hover:scale-105 transition-all 
                                    hover:cursor-pointer hover:bg-teal-700 hover:border-teal-500"
                                    onClick={() => removeItem(item.id)}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
