import './App.css'
import Header from './assets/components/Header'
import {Route,Routes} from  'react-router-dom'
import Home from './assets/pages/Home'
import Login from './assets/pages/Login'
import Signup from './assets/pages/Signup'
import NotFound from './assets/pages/NotFound'
import Chat from './assets/pages/Chat'
function App() {
  return (
   <main>
    <Header />
    <Routes>
      <Route path='/' element={<Home/>} />    
      <Route path='/login' element={<Login/>} />    
      <Route path='/Signup' element={<Signup/>} />    
      <Route path='/*' element={<NotFound/>} />    
      <Route path='/Chat' element={<Chat/>} />    
    </Routes>
   </main>
  )
}

export default App
