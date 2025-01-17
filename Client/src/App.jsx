import './App.css';
import {Routes, Route} from 'react-router-dom';
import Landing from './Pages/Landing';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>

    </>
  )
}

export default App;
