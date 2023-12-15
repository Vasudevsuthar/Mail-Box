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
  const sendhandler = async () => {
    setLoading(true);
    const changeSenderMail = senderEmail.replace(/[@.]/g, "");

    const mailData = {
      to: to,
      subject: Subject,
      message: mailBody,
    };

    try {
      const response = await fetch(
        `https://mail-box-3b26e-default-rtdb.firebaseio.com//${changeSenderMail}SentMail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Mail sent successfully!");
        alert("Mail sent successfully!");
        setTo("");
        setSubject("");
        setEditorState(EditorState.createEmpty());
      } else {
        console.error("Failed to send mail");
        alert("Failed to send mail");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
