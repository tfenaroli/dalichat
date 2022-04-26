import React, { useState, useEffect } from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import Post from "../components/Post";
import { db, storage } from "../firebase";

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

    const getProfilePic = () => {
        storage
            .ref("profilepics")
            .child(props.user?.photoURL)
            .getDownloadURL()
            .then((picture) => {
                var img = document.getElementById("profile");
                img.setAttribute("src", picture);
            });
    };

    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Row className="mt-4">
                    <Col>
                        {props.user ? (
                            <div>
                                <h3 className="text-center text-muted">
                                    Signed in as: <b>{props.user?.email}</b>
                                </h3>

                                <Row className="mt-4 border">
                                    <Col md={5} className="my-4 text-center">
                                        <Image
                                            id="profile"
                                            alt="profile picture"
                                            fluid
                                            roundedCircle
                                            className="border"
                                        />
                                        {getProfilePic()}
                                    </Col>
                                    <Col
                                        md={7}
                                        className="d-flex align-items-center"
                                    >
                                        <div>
                                            <p className="fs-4">
                                                <b>Username: </b>
                                                {props.user?.displayName}
                                            </p>
                                            <p className="fs-4 mt-3">
                                                <b>Email: </b>
                                                {props.user?.email}
                                            </p>

                                            <p className="fs-4">
                                                <b>
                                                    Number of DALIChat Posts:{" "}
                                                </b>
                                                {posts.length}
                                            </p>
                                            <p className="fs-4">
                                                <b>Registered on: </b>
                                                {
                                                    props.user?.metadata
                                                        .creationTime
                                                }
                                            </p>
                                            <p className="fs-4">
                                                <b>Last Signed in: </b>
                                                {
                                                    props.user?.metadata
                                                        .lastSignInTime
                                                }
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                                <h1 className="mt-4 text-center">
                                    Your posts:
                                </h1>
                            </div>
                        ) : (
                            <h1 className="text-center">
                                Sign in to view your account and posts!
                            </h1>
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
                            timestamp={post.timestamp}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    );
}
