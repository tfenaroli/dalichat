import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

export default function Post() {
    return (
        <Container>
            <Row className="d-flex bg-light mt-5 justify-content-center">
                <Card style={{ width: "40rem" }}>
                    <Card.Text>Header</Card.Text>
                    <Card.Img
                        variant="top"
                        src="https://picsum.photos/800/400"
                    />
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                </Card>
                {/* <Container>
                <Row>
                    <Col>
                        <Row>Header</Row>
                        <Row>Image</Row>
                        <Row>Caption</Row>
                    </Col>
                </Row>
            </Container> */}
            </Row>
        </Container>
    );
}
