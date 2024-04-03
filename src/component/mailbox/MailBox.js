import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MailBox = ({ onClose }) => {
  const [to, setTo] = useState("");
  const [Subject, setSubject] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [mailBody, setMailBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMailBody(editorState.getCurrentContent().getPlainText());
  }, [editorState]);

  const senderEmail = localStorage.getItem("email");
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} (${hours}:${minutes}:${seconds})`;
  };
  const formattedDate = formatDate(new Date());

  const sendhandler = async () => {
    setLoading(true);
    const changedSenderMail = senderEmail.replace(/[@.]/g, "");
    const mailData = {
      to: to,
      subject: Subject,
      message: mailBody,
      read: true,
      time: formattedDate,
      send: true,
      receive: false,
    };

    try {
      const response = await fetch(
        `https://mail-box-c03c2-default-rtdb.firebaseio.com/${changedSenderMail}SentMail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
    } catch (err) {
      console.log(err);
    }

    try {
      const mail = to.replace(/[@.]/g, "");
      const response = await fetch(
        `https://mail-box-c03c2-default-rtdb.firebaseio.com/${mail}inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: senderEmail,
            subject: Subject,
            message: mailBody,
            read: false,
            time: formattedDate,
            send: false,
            receive: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }

    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  return (
    <div className="modal show">
      <Modal show={true} onHide={onClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Compose Mail</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">To</InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              type="email"
              placeholder="Enter email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </InputGroup>
          <FloatingLabel
            controlId="floatingInput"
            label="Subject"
            className="mb-3"
          >
            <Form.Control
              placeholder="Subject"
              type="text"
              value={Subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </FloatingLabel>
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Write your Message here"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={sendhandler}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MailBox;
