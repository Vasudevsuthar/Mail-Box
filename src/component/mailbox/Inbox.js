import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailSlice";
import { Link } from "react-router-dom";
import "./inbox.css";

const Inbox = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const receivedData = useSelector((state) => state.email.received || []);
  console.log(receivedData);

  const email = localStorage.getItem("email");
  console.log(email);
  const changedMail = email.replace(/[@.]/g, "");

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      let res = await fetch(
        `https://mail-box-3b26e-default-rtdb.firebaseio.com/${changedMail}inbox.json`
      );
      let data = await res.json();
      let arr = [];
      console.log(data);

      for (let i in data) {
        const id = i;
        arr = [{ id: id, ...data[i] }, ...arr];
        dispatch(mailActions.receivedMail([...arr]));
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [changedMail, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inbox</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {receivedData && receivedData.length === 0 && (
              <h5 style={{ textAlign: "center", margin: "1rem auto" }}>
                No Mails in Inbox!!
              </h5>
            )}
            {isLoading && receivedData.length > 0 && (
              <Spinner animation="border" variant="primary" />
            )}

            {!isLoading &&
              receivedData !== null &&
              receivedData.map((email, index) => (
                <ListGroup.Item key={index} className="custom-list-item">
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "white",
                      alignItems: "center",
                    }}
                    to={`/inbox/${email.id}`}
                    className="custom-link"
                  >
                    <div className="info-container">
                      <span className="from">
                        <b>From:</b> {email.from}
                      </span>{" "}
                      
                      <span className="date-time">
                         ( {email.time} )
                      </span>
                      <br />
                      <span className="subject">
                        <b>Subject:</b> {email.subject}
                      </span>
                      <br/>
                      <span className="subject">
                        <b>Message:</b> {email.message}
                      </span>
                    </div>
                  </Link>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default Inbox;
