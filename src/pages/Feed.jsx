import React from "react";
import { Container, Row } from "react-bootstrap";
import Post from "../components/Post";

export default function Feed() {
    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Post />
                <Post />
                <Post />
                <Post />
            </Container>
        </div>
    );
}
