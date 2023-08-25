import { useSelector } from 'react-redux'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import Profile from './components/Profile/Profile'


function App() {

  const isLoggedIn = useSelector(state => state.users.isLoggedIn)
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isLoggedIn && !location.pathname.includes("sign")) {
      navigate('/signin')
    }
    else if (isLoggedIn && location.pathname.includes("sign")) {
      navigate('/')
    }
  }, [isLoggedIn, location.pathname])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='signup' element={<SignUp />} />
        <Route path='signin' element={<SignIn />} />
        <Route path='profile' element={<Profile />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  )
}

export default App
