import './App.css';
import Background from './Components/Background/background';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Background/>
      {/* <Login/> */}
      {/* <Register/> */}
      <Home/>
    </div>
  );
}

export default App;
