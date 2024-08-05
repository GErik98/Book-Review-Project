import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
// pages & components
import Home from './pages/Home'
import BookDetailPage from './pages/BookDetailPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import User from './pages/User'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route 
              path="/books/:id" 
              element={<BookDetailPage />} 
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/user"
              element={<User />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
