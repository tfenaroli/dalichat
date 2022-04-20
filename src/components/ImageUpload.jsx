import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import { v4 as uuidv4 } from "uuid";
// import "../app.css";

export default function ImageUpload(props) {
    const [caption, setCaption] = useState("");
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            let name = uuidv4();
            name += ".jpg";
            var newFile = new File([e.target.files[0]], name, {
                type: "image/jpg",
            });
            setImage(newFile);
        }
    };

    const handleUpload = () => {
        if (caption === "") {
            alert("Empty caption!");
        } else {
            if (image) {
                console.log("image name is: " + image.name);
                const uploadTask = storage
                    .ref(`images/${image.name}`)
                    .put(image);
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        );
                        setProgress(progress);
                    },
                    (error) => {
                        console.log(error);
                        alert(error.message);
                    },
                    () => {
                        storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then((picture) => {
                                db.collection("posts").add({
                                    timestamp:
                                        firebase.firestore.FieldValue.serverTimestamp(),
                                    username: props.user?.displayName,

                                    picture: picture,
                                    caption: caption,
                                });

                                setCaption("");
                                setImage(null);
                            });
                    }
                );
            } else {
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    username: props.user?.displayName,

                    picture: "",
                    caption: caption,
                });

                setCaption("");
                setImage(null);
            }
        }
    };

    return (
        <Container className="mt-5 border bg-light">
            <Row className="">
                <Col className="d-flex justify-content-center">
                    <progress className="mt-3" value={progress} max="100" />
                </Col>
            </Row>
            <Row className="d-flex justify-content-center">
                <Col xs={8} className="d-flex justify-content-center">
                    <Form.Control
                        className="mt-3"
                        type="text"
                        placeholder="Enter caption"
                        value={caption}
                        onChange={(event) => setCaption(event.target.value)}
                    />
                </Col>
            </Row>

            <Row className="mb-3 d-flex justify-content-center">
                <Col lg={3} className="mt-3 text-center">
                    <Form.Control
                        size="sm"
                        type="file"
                        onChange={handleChange}
                    />
                </Col>
                <Col lg={3} className="mt-3 text-center">
                    {caption === "" ? (
                        <div>
                            <Button
                                onClick={handleUpload}
                                className="text-light"
                                disabled
                            >
                                Upload
                            </Button>
                        </div>
                    ) : (
                        <Button onClick={handleUpload} className="text-light">
                            Upload
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}
