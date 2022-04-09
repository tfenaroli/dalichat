import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Account(props) {
    return (
        <div className="d-flex justify-content-center">
            <Container>
                <Row className="mt-5">
                    <Col className="text-center">
                        {props.user ? (
                            <h1>Signed in as: {props.user?.email}</h1>
                        ) : (
                            <h1>Sign in to view your account!</h1>
                        )}
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col className="text-center">
                        <h1>Your posts:</h1>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
