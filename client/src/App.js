import './App.css';
import Background from './Components/Background/background';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';
import {ContextProvider} from './Context/context';
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
