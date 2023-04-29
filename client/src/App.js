import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Background from './Components/Background/background';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import {ContextProvider,Context} from './Context/context';
import { useContext } from 'react';
function App() {
  return (
    <ContextProvider>
      <div className="App">
        <Background/>
        {/* <Login/> */}
        {/* <Register/> */}
        <Home/>
      </div>
    </ContextProvider>
  );
}

export default App;
