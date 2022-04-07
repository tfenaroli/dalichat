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
} from "react-bootstrap";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

export default function Post(props) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

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
        <Col className="mt-5 d-flex justify-content-center">
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
                <Card.Body className="bg-light pt-3 pb-0 border">
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

                    {comments.length > 3 ?? <p>more than 3 comments</p>}
                </Card.Body>
            </Card>
        </Col>
    );
}
