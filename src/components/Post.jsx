import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

export default function Post(props) {
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
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
