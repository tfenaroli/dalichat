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

    return (
        <Col className="mt-5 d-flex justify-content-center">
            {/* <Row className="mt-5 bg-light"> */}
            {/* <Col className="d-flex justify-content-center"> */}
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
                <Card.Body className="bg-light border">
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
                                    <Button onClick={handleComment}>
                                        Post
                                    </Button>
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

                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>
                                See All Comments
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="mt-2">
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
                </Card.Body>
            </Card>
            {/* </Col> */}
            {/* </Row> */}
        </Col>
    );
}
