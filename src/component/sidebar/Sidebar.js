import React, { useEffect, useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import { AiOutlineInbox, AiOutlineSend } from "react-icons/ai";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MailBox from "../mailbox/MailBox";
import { FaPen } from "react-icons/fa";
import "./Sidebar.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Badge from "react-bootstrap/Badge";
import { authActions } from "../store/authSlice";
import { useDispatch } from "react-redux";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mailCount, setMailCount] = useState(0);
  const location = useLocation();
  const email = localStorage.getItem("email");
  const inboxMails = useSelector((state) => state.email.unreadMails);
  const sentBox = useSelector((state) => state.email.sent);
  const sentBoxMails = sentBox.length;
  const dispatch = useDispatch();
  const nav = useNavigate()


  useEffect(() => {
    setMailCount(inboxMails);
  }, [email, inboxMails]);
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

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.setItem("email", null);
    localStorage.setItem("token", null);
    nav("/login");
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
    {
      path: "/sentMails",
      name: "Sent-Box",
      icon: <AiOutlineSend />,
    },
  ];
  return (
    <div className="Container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            MailBox
          </h1>
          <div style={{ marginLeft: isOpen ? "30px" : "0" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <Button
          style={{ display: isOpen ? "block" : "none", margin: "10px" }}
          variant="outline-info"
          onClick={handleComposeClick}
        >
          <FaPen /> Compose
        </Button>
        {menuItems.map((item, index) => (
          <NavLink
          to={item.path}
          key={index}
          className="link"
        >
          <div className="icon">{item.icon}</div>
          <div
            style={{ display: isOpen ? "block" : "none" }}
            className="link_text"
          >
            {item.name}
          </div>
          {location.pathname === "/inbox" && item.path === "/inbox" && (
            <Badge pill bg="dark" style={{ display: isOpen ? "block" : "none" }}>
              {mailCount}
            </Badge>
          )}
          {location.pathname === "/sentMails" &&
            item.path === "/sentMails" && (
              <Badge pill bg="dark" style={{ display: isOpen ? "block" : "none" }}>
                {sentBoxMails}
              </Badge>
            )}
        </NavLink>
        
        ))}
        <Button style={{ display: isOpen ? "block" : "none", margin: "10px" }}
          variant="outline-danger" onClick={handleLogout}>Logout</Button>
      </div>
      <main className="main">{children}</main>
      {showMailBox && <MailBox onClose={handleCloseMailBox} />}
    </div>
  );
};

export default Sidebar;
