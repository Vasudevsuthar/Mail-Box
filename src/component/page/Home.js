import React, { useState } from "react";
import classes from "./Home.module.css";
import { FaPen } from "react-icons/fa";
import { HiMailOpen } from "react-icons/hi";

import MailBox from "../mailbox/MailBox";
import Inbox from "../mailbox/Inbox";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Home() {
  const [showMailBox, setShowMailBox] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

  const handleComposeClick = () => {
    setShowMailBox(true);
    setShowInbox(false); 
  };

  const handleCloseMailBox = () => {
    setShowMailBox(false);
  };

  const handleShow = () => {
    setShowInbox(true);
    setShowMailBox(false); 
  };

  const handleClose = () => setShowInbox(false);

  return (
    <div>
      <header className={classes.home}>
        <h2>Welcome to your Mail-Box</h2>
        <DropdownButton id="dropdown-basic-button" title="Mail-Box">
          <Dropdown.Item onClick={handleComposeClick}><FaPen /> Compose</Dropdown.Item>
          <Dropdown.Item onClick={handleShow} ><HiMailOpen />Inbox</Dropdown.Item>
        </DropdownButton>
      </header>
      {showMailBox && <MailBox onClose={handleCloseMailBox} />}
      {showInbox && <Inbox onClose={handleClose} />}
    </div>
  );
}

export default Home;
