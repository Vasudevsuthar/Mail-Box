import React, { useCallback, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailSlice";
import { Link } from "react-router-dom";
import "./inbox.css";
import { Card, Button } from "react-bootstrap";

const Inbox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const receivedData = useSelector((state) => state.email.received);

  const email = localStorage.getItem("email");
  const changedMail = email.replace(/[@.]/g, "");
  localStorage.setItem("numberOfMails", receivedData.length);

  const getData = useCallback(async () => {
    try {
      setIsLoading(true);
      let res = await fetch(
        `https://mail-box-3b26e-default-rtdb.firebaseio.com/${changedMail}inbox.json`
      );
      let data = await res.json();
      let arr = [];
      let unreadMails = 0;
      console.log(data);

      for (let i in data) {
        if (data[i].read === false) {
          unreadMails++;
        }
        const id = i;
        arr = [{ id: id, ...data[i] }, ...arr];
        dispatch(mailActions.receivedMail([...arr]));
        dispatch(mailActions.unreadMessage(unreadMails));
        setIsLoading(false);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }, [changedMail, dispatch]);

  useEffect(() => {
    getData();

    const intervalId = setInterval(() => {
      getData();
    },2000);
    return () => clearInterval(intervalId);
  }, [getData]);

  const DeleteHandler = async (id) => {
    setIsLoading(true);
    const mail = receivedData.filter((item) => item.id === id);
    dispatch(mailActions.deleteMail(mail));
    const res = await fetch(
      `https://mail-box-3b26e-default-rtdb.firebaseio.com/${changedMail}inbox/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let response = await res;
    console.log(response);
    getData();
    setIsLoading(false);
  };

  return (
    <>
      <Card bg="light">
        <h2 style={{textAlign:"center"}}>Inbox</h2>
        <ListGroup>
          {receivedData && receivedData.length === 0 && (
            <h5 style={{ textAlign: "center", margin: "1rem auto" }}>
              No Mails in Inbox!!
            </h5>
          )}
         

          {!isLoading &&
            receivedData !== null &&
            Object.keys(receivedData).map((email, index) => (
              <ListGroup.Item key={index} className="custom-list-item">
                <Link
                  style={{
                    textDecoration: "none",
                    color: "white",
                    alignItems: "center",
                  }}
                  to={`/inbox/${receivedData[email].id}`}
                  className="custom-link"
                >
                  {receivedData[email].read === false && (
                    <p
                      className="mt-3 me-3 ms-0"
                      style={{ marginRight: "10px", float: "left" }}
                    >
                      🟢
                    </p>
                  )}{" "}
                  <div className="info-container">
                    <span className="from">
                      <b>From:</b> {receivedData[email].from}
                    </span>{" "}
                    <span className="date-time">( {receivedData[email].time} )</span>
                    <br />
                    <span className="subject">
                      <b>Subject:</b> {receivedData[email].subject}
                    </span>
                  </div>
                </Link>
                <Button
                    onClick={() => DeleteHandler(receivedData[email].id)}
                    key={receivedData[email].id}
                    style={{ float: "right" }}
                    variant="danger">
                    Delete
                  </Button>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </Card>
    </>
  );
};

export default Inbox;
