import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Accordion,
    Image,
    Modal,
} from "react-bootstrap";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
// import "../app.css";

export default function Post(props) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [reactions, setReactions] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const handleComment = (event) => {
        event.preventDefault();

        if (comment === "") {
            alert("Empty comment!");
        } else {
            db.collection("posts")
                .doc(props.postId)
                .collection("comments")
                .add({
                    username: props.user.displayName,
                    comment: comment,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            setComment("");
        }
    };

    const handleLike = () => {
        db.collection("posts").doc(props.postId).collection("reactions").add({
            username: props.user.displayName,
            reaction: "like",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    };

    const handleDislike = () => {
        db.collection("posts").doc(props.postId).collection("reactions").add({
            username: props.user.displayName,
            reaction: "dislike",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
    };

    useEffect(() => {
        let unsub;
        if (props.postId) {
            unsub = db
                .collection("posts")
                .doc(props.postId)
                .collection("reactions")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setReactions(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsub();
        };
    }, [props.postId]);

    useEffect(() => {
        let unsub;
        if (props.postId) {
            unsub = db
                .collection("posts")
                .doc(props.postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsub();
        };
    }, [props.postId]);

    const renderAccordion = () => {
        if (comments.length > 3) {
            return (
                <Accordion defaultActiveKey="0" className="mb-3">
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            See All Comments (Scrollable)
                        </Accordion.Header>
                        <Accordion.Body>
                            <div
                                className="mt-2"
                                style={{ overflowY: "auto", height: "10rem" }}
                            >
                                {comments.map((comment) => (
                                    <p>
                                        <b>{comment.username}</b>:{" "}
                                        {comment.comment}
                                    </p>
                                ))}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            );
        }
    };

    return (
        <Col xs={12} className="mt-5 d-flex justify-content-center">
            <Card style={{ width: "30rem" }}>
                <Card.Body>
                    <Card.Title className="text-center fs-2">
                        <b>{props.username}</b>
                    </Card.Title>
                </Card.Body>
                <Image fluid="true" variant="top" src={props.picture} />

                <Card.Body>
                    <Card.Text>
                        <b>{props.username}</b> {props.caption}
                    </Card.Text>
                </Card.Body>
                {props.user && (
                    <Container>
                        <Row className="mb-3 d-flex justify-content-around">
                            <Col>
                                <Row>
                                    <Col xs={2} className="text-center">
                                        <Button
                                            variant="outline-success"
                                            onClick={handleLike}
                                        >
                                            <i className="bi bi-hand-thumbs-up"></i>
                                        </Button>
                                    </Col>
                                    <Col xs={2} className="text-center">
                                        <Button
                                            variant="outline-danger"
                                            onClick={handleDislike}
                                        >
                                            <i className="bi bi-hand-thumbs-down"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={4}>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowModal(true)}
                                >
                                    Reactions
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                )}

                <Card.Body className="bg-light pt-3 pb-0">
                    <p>Comments:</p>
                    {props.user && (
                        <Container>
                            <Row>
                                <Col xs={8} className="text-center">
                                    <Form.Control
                                        className=""
                                        type="text"
                                        placeholder="Enter comment"
                                        value={comment}
                                        onChange={(event) =>
                                            setComment(event.target.value)
                                        }
                                    />
                                </Col>
                                <Col xs={4} className="text-center">
                                    {comment === "" ? (
                                        <div>
                                            <Button
                                                onClick={handleComment}
                                                disabled
                                            >
                                                Post
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button onClick={handleComment}>
                                            Post
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    )}
                    <div className="mt-3">
                        {comments.slice(0, 3).map((comment) => (
                            <p>
                                <b>{comment.username}</b>: {comment.comment}
                            </p>
                        ))}
                    </div>
                    {renderAccordion()}
                </Card.Body>
            </Card>
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Reactions!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            {reactions.map((reaction) => {
                                if (reaction.reaction === "like") {
                                    return (
                                        <Col className="text-center">
                                            <i
                                                className="bi bi-hand-thumbs-up-fill text-success"
                                                style={{ fontSize: "2rem" }}
                                            ></i>
                                            <p>{reaction.username}</p>
                                        </Col>
                                    );
                                } else if (reaction.reaction === "dislike") {
                                    return (
                                        <Col className="text-center">
                                            <i
                                                className="bi bi-hand-thumbs-down-fill text-danger"
                                                style={{ fontSize: "2rem" }}
                                            ></i>
                                            <p>{reaction.username}</p>
                                        </Col>
                                    );
                                }
                            })}
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </Col>
    );
}
