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
            <Card className="text-center" style={{ width: "12rem" }}>
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
                        variant="outline-secondary"
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
                <Modal.Body className="p-4">
                    <Container>
                        <Row className="d-flex align-items-center justify-content-around">
                            <Col lg={6} className="mb-3">
                                <Image src={props.picture} fluid="true" />
                            </Col>
                            <Col lg={5} className="bg-light border">
                                <p>
                                    <b>Name:</b> {props.name}
                                </p>
                                <p>
                                    <b>Year:</b> {props.year}
                                </p>
                                <p>
                                    <b>Gender:</b> {props.gender}
                                </p>
                                <p>
                                    <b>Major: </b>
                                    {props.major}
                                </p>
                                <p>
                                    <b>Birthday: </b>
                                    {props.birthday}
                                </p>
                                <p>
                                    <b>Role: </b>
                                    {props.role}
                                </p>
                                <p>
                                    <b>Home: </b>
                                    {props.home}
                                </p>
                                <p>
                                    <b>Quote: </b>
                                    {props.quote}
                                </p>
                                <p>
                                    <b>Favorite Shoe: </b>
                                    {props.favoriteShoe}
                                </p>
                                <p>
                                    <b>Favorite Artist: </b>
                                    {props.favoriteArtist}
                                </p>
                                <p>
                                    <b>Favorite Color: </b>
                                    {props.favoriteColor}
                                </p>
                                <p>
                                    <b>Phone Type: </b>
                                    {props.phoneType}
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </Col>
    );
}
