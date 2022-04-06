import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { db } from "../firebase";
import firebase from "firebase/compat/app";

export default function Post(props) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    const handleComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(props.postId).collection("comments").add({
            username: props.user.displayName,
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
    };

    useEffect(() => {
        let unsub;
        if (props.postId) {
            unsub = db
                .collection("posts")
                .doc(props.postId)
                .collection("comments")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsub();
        };
    }, [props.postId]);

    return (
        <Container>
            <Row className="mt-5 bg-light">
                <Col className="d-flex justify-content-center">
                    <Card style={{ width: "30rem" }}>
                        <Card.Body>
                            <Card.Title className="text-center fs-2">
                                <b>{props.username}</b>
                            </Card.Title>
                        </Card.Body>
                        <Card.Img variant="top" src={props.picture} />
                        <Card.Body>
                            <Card.Text>{props.caption}</Card.Text>
                        </Card.Body>
                        <Card.Body>
                            {props.user && (
                                <div>
                                    <Form.Control
                                        className=""
                                        type="text"
                                        placeholder="Enter comment"
                                        value={comment}
                                        onChange={(event) =>
                                            setComment(event.target.value)
                                        }
                                    />
                                    <Button onClick={handleComment}>
                                        Post
                                    </Button>
                                </div>
                            )}

                            {comments.map((comment) => (
                                <p>
                                    <b>{comment.username}</b>: {comment.comment}
                                </p>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
