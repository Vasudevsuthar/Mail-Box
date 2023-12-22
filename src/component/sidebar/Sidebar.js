import React, { useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { AiOutlineInbox } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import MailBox from "../mailbox/MailBox";
import { FaPen } from "react-icons/fa";
import "./Sidebar.css";
import { Button } from "react-bootstrap";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const [showMailBox, setShowMailBox] = useState(false);

  const handleComposeClick = () => {
    setShowMailBox(true); 
  };

  const handleCloseMailBox = () => {
    setShowMailBox(false);
  };

  const menuItems = [
    {
      path: "/home",
      name: "Home",
      icon: <FaHome />,
    },
    {
      path: "/inbox",
      name: "Inbox",
      icon: <AiOutlineInbox />,
    },
  ];
  return (
    <div className="Container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
          <div style={{marginLeft: isOpen ? "50px" : "0"}} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <Button style={{display: isOpen ? "block" : "none", margin:"10px"}} variant="outline-info" onClick={handleComposeClick}><FaPen /> Compose</Button>
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main className="main">{children}</main>
      {showMailBox && <MailBox onClose={handleCloseMailBox} />}
    </div>
  );
};

export default Sidebar;
