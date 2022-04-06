import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
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
                        Sign In to Post to DaliChat!
                    </h1>
                )}

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
