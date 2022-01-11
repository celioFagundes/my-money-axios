import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Login from "./pages/Login";
import Home from "./pages/Meses";
import Movimentacoes from "./pages/Movimentacoes";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  return (
    <Router>
       <div>
        <Header/>
        <Routes>
          <Route exact path  = '/login' element = {<Login/>}/>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/movimentacoes/:id' element = {<Movimentacoes/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
