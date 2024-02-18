import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./NavbarComponents/Navbar";
import { About, Contact, Chess, Home } from "./NavbarComponents/pages";
import SingIn from "./ChessBoardComponents/singIn/singIn";
import LogIn from "./ChessBoardComponents/login/logIn";

function App() {
  return (
    <div>
      <div id="app">
        <Navbar />
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Chess" element={<Chess />} />
        </Routes>
      </div>
      <div>
        <Routes>
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/SingIn" element={<SingIn />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
