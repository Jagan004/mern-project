import logo from './logo.svg';
import './App.css';
import Login from './components/Auth/login/login';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import SignIn from './components/Auth/signin/sign';
import Home from './components/home/home';
import { ToastContainer, toast } from 'react-toastify';
import DisplayProduct from './components/Products/displayProduct/displayProduct';

function App() {
  return (
   <>
   <Router>
    <Switch>
      <Route exact path="/"> <Login/></Route>
      <Route path="/sign"><SignIn/></Route>
      <Route path="/home"><Home/></Route>
      <Route path="/displayProduct"><DisplayProduct/></Route>
    </Switch>
   </Router>
   <ToastContainer
   position="top-right"
   autoClose={3000}
   hideProgressBar={false}
   newestOnTop={false}
   closeOnClick
   rtl={false}
   pauseOnFocusLoss
   draggable
   pauseOnHover
   theme="light"
   />
   </>
   
  );
}

export default App;
