import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './Context/notes/NoteState';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
   <>
   <NoteState>
   <Router>
    <Navbar/>
     <div className="container">
   <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/About">
            <About/>
          </Route>
          <Route exact path="/Login">
            <Login/>
          </Route>
          <Route exact path="/SignUp">
            <SignUp/>
          </Route>
        </Switch>
          </div>
   </Router>
   </NoteState>
   </>
  );
}

export default App;
