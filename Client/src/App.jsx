import './App.css';
import {Routes, Route} from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';

function App() {

  return (
    <>
    <Routes>
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />
    </Routes>

    </>
  )
}

export default App;
