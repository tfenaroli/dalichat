import React from "react";
import { Container, Row, Card } from "react-bootstrap";

export default function Post(props) {
    return (
        <Container>
            <Row className="d-flex bg-light mt-5 justify-content-center">
                <Card style={{ width: "40rem" }} className="text-center">
                    <Card.Text className="fs-2">
                        <b>{props.username}</b>
                    </Card.Text>
                    <Card.Img variant="top" src={props.picture} />
                    <Card.Body>
                        <Card.Text>{props.caption}</Card.Text>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}
