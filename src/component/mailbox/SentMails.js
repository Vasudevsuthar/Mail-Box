import React, { useCallback, useEffect, useState } from "react";
import { Button, Card, ListGroup, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../store/mailSlice";
import { Link } from "react-router-dom";
import "./inbox.css";

const SentMails = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.email.sent);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");
  const mail = email.replace(/[@.]/g, "");

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://mail-box-c03c2-default-rtdb.firebaseio.com/${mail}SentMail.json`
      );
      let data = await res.json();
      let arr = [];

      for (let key in data) {
        const id = key;
        arr = [{ id: id, ...data[key] }, ...arr];

        dispatch(mailActions.sentMail([...arr]));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [mail, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Card bg="light">
        <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
          Sent Mails
        </h2>
        <ListGroup>
          {data.length === 0 && (
            <h5 style={{ textAlign: "center", margin: "1rem auto" }}>
              No Mails in Outbox!!
            </h5>
          )}
          {loading && data.length > 0 && <Spinner />}

          {!loading &&
            data !== null &&
            Object.keys(data).map((email, index) => {
              return (
                <ListGroup.Item key={index} className="custom-list-item">
                  <Link
                    key={index}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      alignItems: "center",
                    }}
                    className="custom-link"
                    to={`/sentMails/${data[email].id}`}
                  >
                    <div className="info-container">
                    <span
                      className="from"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      <b>To:</b> {data[email].to}
                    </span>{" "}
                    <span className="date-time">({data[email].time})</span>
                    <br />
                    <span className="subject">
                      <b>Subject: </b>
                      {data[email].subject}
                    </span>
                    </div>
                  </Link>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>
    </>
  );
};

export default SentMails;
