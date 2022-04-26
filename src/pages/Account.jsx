import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Post from "../components/Post";
import { db } from "../firebase";

export default function Account(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (props.user !== null) {
            db.collection("posts")
                .where("username", "==", props.user?.displayName)
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setPosts(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            post: doc.data(),
                        }))
                    );
                });
        } else {
            setPosts([]);
        }
    }, [props.user]);

    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Row className="mt-5">
                    <Col className="text-center">
                        {props.user ? (
                            <div>
                                <h1>Signed in as: {props.user?.email}</h1>
                                <h1 className="mt-5">Your posts:</h1>
                            </div>
                        ) : (
                            <h1>Sign in to view your account and posts!</h1>
                        )}
                    </Col>
                </Row>

                <Row className="align-items-center">
                    {posts.map(({ id, post }) => (
                        <Post
                            key={id}
                            postId={id}
                            user={props.user}
                            username={post.username}
                            profilePic={post.profilePic}
                            caption={post.caption}
                            picture={post.picture}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    );
}
