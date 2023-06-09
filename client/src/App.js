import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './Components/Background/background';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import {ContextProvider} from './Context/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//DevExtremeREACTIVE calendar kullanılacak.
//Yaklaşan tarihler için bir alan.
//Planlanmış tarihler olacak.
function App() {
  return (
    <ContextProvider>
      <div className="App">
      <Background/>
        <BrowserRouter>
        <Routes>
            <Route index path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      </div>
    </ContextProvider>
  );
}

export default App;
