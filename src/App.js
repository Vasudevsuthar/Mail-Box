import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/page/Login";
import Singup from "./component/page/Singup";
import Home from "./component/page/Home";
import MailBox from "./component/mailbox/MailBox";
import Inbox from "./component/mailbox/Inbox";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} /> 
        <Route path="/" element={<Singup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mail" element={<MailBox />} />
        <Route path="inbox" element={<Inbox />} />
      </Routes>
    </Router>
  );
}

export default App;
