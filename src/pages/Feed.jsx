import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Post from "../components/Post";
import ImageUpload from "../components/ImageUpload";
import { db } from "../firebase";

export default function Feed(props) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) => {
                setPosts(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        post: doc.data(),
                    }))
                );
            });
    }, []);

    return (
        <div className="d-flex justify-content-center">
            <Container>
                {props.user ? (
                    <div>
                        <ImageUpload user={props.user} />
                    </div>
                ) : (
                    <h1 className="mt-5 text-center">
                        Sign in to post to DALIChat!
                    </h1>
                )}
                <Row>
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
