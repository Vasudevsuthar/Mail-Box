import React, { useState } from "react";
import classes from "./Home.module.css";
import { Button } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import MailBox from "./MailBox";

function Home() {
  const [showMailBox, setShowMailBox] = useState(false);

  const handleComposeClick = () => {
    setShowMailBox(true);
  };

  const handleCloseMailBox = () => {
    setShowMailBox(false);
  };
  return (
    <div>
      <header className={classes.home}>
        <h2>Welcome to your Mail-Box</h2>
        <Button onClick={handleComposeClick}>
          <FaPen /> Compose{" "}
        </Button>
      </header>
      {showMailBox && <MailBox onClose={handleCloseMailBox} />}
    </div>
  );
}

export default Home;
