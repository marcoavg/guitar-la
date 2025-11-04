import { useMemo } from "react";
import type { OrderItem } from "../types";
import { formatCurrency } from "../helpers";

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
  placeOrder: () => void;
};

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {

  const subtotalAmount = useMemo(() => {
    return order.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [order]);

  const tipAmount = useMemo(() => {
    return (subtotalAmount * tip);
  }, [subtotalAmount, tip]);

  const tipValue = useMemo(() => {
    return tip * 100;
  }, [tip]);


  return (
    <>
      <div className="space-y-3">
        <h2 className='font-black text-white text-2xl '>Totales y propinas</h2>
        <p> Subtotal a pagar: {''}
          <span className="font-normal"> {formatCurrency(subtotalAmount)} </span>
        </p>
        <p> Propina sugerida ({tipValue}%): {''}
          <span className="font-normal"> {formatCurrency(tipAmount)} </span>
        </p>
        <p> Total a pagar: {''}
          <span className="font-normal"> {formatCurrency(subtotalAmount + tipAmount)} </span>
        </p>
      </div>
      <button className={`w-full text-white bg-teal-700 border-2 p-2 rounded-md disabled:opacity-10 mt-5 ${order.length === 0 ? '' : 'hover:bg-teal-500 hover:border-teal-500 hover:scale-105 transition-all hover:cursor-pointer'}`}
        disabled={order.length === 0}
        onClick={placeOrder}
      >
        Guardar Orden
      </button>
    </>
  )
}
