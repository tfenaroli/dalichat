import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const Footer = () => {
    return (
        <React.Fragment>
            <hr className="mt-4"></hr>

            <Row>
                <Col className="text-center">
                    <p className="text-break text-muted fs-5">
                        developed by <b>Thomas Fenaroli</b>
                    </p>
                </Col>
            </Row>

            <Row className="d-flex justify-content-center">
                <Col xs={4} className="mt-2 mb-4 d-flex justify-content-center">
                    <Button
                        className="mx-2"
                        variant="secondary"
                        href="https://github.com/tfenaroli/dalichat"
                        target="_blank"
                    >
                        <i className="bi bi-github" />
                    </Button>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default Footer;
