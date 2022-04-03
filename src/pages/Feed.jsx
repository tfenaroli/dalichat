import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Post from "../components/Post";
import { db } from "../firebase";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) => {
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
                {posts.map(({ id, post }) => (
                    <Post
                        key={id}
                        username={post.username}
                        caption={post.caption}
                        picture={post.picture}
                    />
                ))}
            </Container>
        </div>
    );
}
