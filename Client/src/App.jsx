import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './Pages/Landing';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';

function App() {

  return (
    <>
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/home" element={<Home />} />

    </Routes>

    </>
  )
}

export default App;
