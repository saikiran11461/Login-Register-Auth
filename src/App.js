import './App.css';
import {Route} from "react-router-dom";
import Login from './Components/Login.jsx';
import Signup from './Components/Signup';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component ={Login}></Route>
      <Route exact path="/Signup" component ={Signup}/>
    </div>
  );
}

export default App;
