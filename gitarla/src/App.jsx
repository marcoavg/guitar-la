
import Header from './components/Header'   
import Gitar from './components/Gitar' 
import {useCart} from './hooks/useCart'

function App() {


    const {data, cart, addToCart, removeFromCart, clearCart, updateCartItemQuantity, isEmpty, cartTotal} = useCart()


    return (
        <>
        <Header 
            cart={cart} 
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            updateCartItemQuantity={updateCartItemQuantity}
            isEmpty={isEmpty}
            cartTotal={cartTotal}
        />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                {data.map(guitar => (
                    <Gitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
                ))}
            </div>
        </main>
                                                
        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
        
        </>
    )
}

export default App
