import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Image,
    Card,
    Button,
    Modal,
} from "react-bootstrap";

export default function Profile(props) {
    const [showModal, setShowModal] = useState(false);
    return (
        <Col className="mt-5 d-flex justify-content-center">
            <Card style={{ width: "12rem" }}>
                <Card.Img
                    variant="top"
                    src={props.picture}
                    width="120"
                    height="180"
                />
                <Card.Body>
                    <Card.Title>{props.name}</Card.Title>
                    <Card.Text>{props.year}</Card.Text>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(true)}
                    >
                        See Profile
                    </Button>
                </Card.Body>
            </Card>
            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        {props.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Image
                                    src={props.picture}
                                    height="300"
                                    width="300"
                                />
                            </Col>
                            <Col>
                                <Row>Name: {props.name}</Row>
                                <Row>Year: {props.year}</Row>
                                <Row>Gender: {props.gender}</Row>
                                <Row>Major: {props.major}</Row>
                                <Row>Birthday: {props.birthday}</Row>
                                <Row>Role: {props.role}</Row>
                                <Row>Home: {props.home}</Row>
                                <Row>Quote: {props.quote}</Row>
                                <Row>Favorite Shoe: {props.favoriteShoe}</Row>
                                <Row>
                                    Favorite Artist: {props.favoriteArtist}
                                </Row>
                                <Row>Favorite Color: {props.favoriteColor}</Row>
                                <Row>Phone Type: {props.phoneType}</Row>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </Col>
    );
}
