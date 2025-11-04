import { use, useMemo } from "react";
import type { OrderItem } from "../types";
import { formatCurrency } from "../helpers";

type OrderTotalsProps = {
  order: OrderItem[];
  tip: number;
};

export default function OrderTotals({ order, tip }: OrderTotalsProps) {

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
      <button>

      </button>
    </>
  )
}
