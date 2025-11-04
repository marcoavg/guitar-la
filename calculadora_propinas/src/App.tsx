import MenuItem from "./components/MenuItem"
import { menuItems } from "./data/db"
import type { MenuItemType } from "./types"
import useOrder from "./hooks/useOrder"
import OrderContents from "./components/OrderContents";
import OrderTotals from "./components/OrderTotals";
import TipPercentageForm from "./components/TipPercentageForm";


function App() {

  const { addItem, order, removeItem, tip, setTip } = useOrder();

  return (
    <>
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-center text-2xl font-bold">Calculadora de Propinas</h1>
      </header>
      <main className=" bg-gray-600">
        <div className="max-w-7xl mx-auto py-20 grid md:grid-cols-2 max-h-max text-white">
          <div>
            <h2 className="text-4xl font-bold pb-3 text-center">Menú</h2>
            {
              menuItems.map((item: MenuItemType) => (
                <MenuItem 
                  key={item.id} 
                  item={item}
                  addItem={addItem}
                /> 
              ))
            }
          </div>
          <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10 ms-5">
              <OrderContents order={order} removeItem={removeItem} />
              <TipPercentageForm setTip={setTip} />
              <OrderTotals order={order} tip={tip} />
          </div>
        </div>
      </main>
    </>
  )
}

export default App
