import { useSelector } from 'react-redux'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


function App() {

  const isLoggedIn = useSelector(state => state.users.isLoggedIn)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='signin' element={<SignIn />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />

    </>
  )
}

export default App
