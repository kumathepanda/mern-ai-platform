import './App.css'
import Header from './assets/components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './assets/pages/Home'
import Login from './assets/pages/Login'
import Signup from './assets/pages/Signup'
import NotFound from './assets/pages/NotFound'
import Chat from './assets/pages/Chat'

function App() {
  return (
    <>
      {/* Full-width sticky header lives OUTSIDE the constrained main */}
      <Header />

      {/* Main content is fine to be wrapped or padded */}
      <main className="pt-20 px-4 max-w-screen-xl mx-auto">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/*' element={<NotFound />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </main>
    </>
  )
}

export default App
