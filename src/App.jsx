import './App.css'
import BurgerList from '../burguers/burgerList'
import Cart from './cart'
function App() {

  return (
    <>
    <nav>
      <Cart />
    </nav>
    <div className='flex justify-center flex-col items-center m-auto w-screen h-104 bg-[url(../imagens/bg.png)] text-white'>
    <h1 className='font-extrabold my-10 text-xl'>Hamburgui</h1>
    <p>Rua TakakinaVara, 87, Centro</p>
    <div className='bg-emerald-400 p-3 rounded-2xl my-10'>
      <h3>Seg à Sab - 18h às 23h </h3>
    </div>
    </div>
    <div className='flex flex-col items-center justify-center w-screen my-10'>
      <h1 className='font-bold text-3xl my-4'>Conheça nosso menu!</h1>
      <div className='w-screen'>
        <BurgerList />
      </div>
    </div>
    </>
  )
}

export default App
