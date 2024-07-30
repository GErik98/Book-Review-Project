import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

// pages & components
import Home from './pages/Home'
import NavigationBar from './components/Navbar'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
