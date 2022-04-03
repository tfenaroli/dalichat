import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <React.Fragment>
            <Navbar className="mt-3 bg-light" expand="md">
                <Container>
                    <Navbar.Brand />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                            <Nav.Link
                                className="mx-auto"
                                as={Link}
                                to="/members"
                            >
                                Members
                            </Nav.Link>
                            <Nav.Link className="mx-auto" as={Link} to="/feed">
                                Feed
                            </Nav.Link>
                            <Nav.Link
                                className="mx-auto"
                                as={Link}
                                to="/account"
                            >
                                Account
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    );
};

export default NavBar;
