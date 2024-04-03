import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./component/page/Login";
import Signup from "./component/page/Signup";
import Home from "./component/page/Home";
import MailBox from "./component/mailbox/MailBox";
import Inbox from "./component/mailbox/Inbox";
import Sidebar from "./component/sidebar/Sidebar";
import OpenMails from "./component/mailbox/OpenMail";
import SentMails from './component/mailbox/SentMails';
import OpenSentMails from './component/mailbox/OpenSentMails';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <Sidebar>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/mail" element={<MailBox />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/inbox/:id" element={<OpenMails />} />
              <Route path="/sentMails" element={<SentMails />} />
              <Route path="/sentMails/:id" element={<OpenSentMails />} />
            </Routes>
          </Sidebar>
        }
      />
    </Routes>
  </Router>
  );
}

export default App;