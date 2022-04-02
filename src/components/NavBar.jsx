import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavBar = () => {
    return (
        <React.Fragment>
            <Navbar className="mt-3 bg-light" expand="md">
                <Container>
                    <Navbar.Brand />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mx-auto">
                            <Nav.Link className="mx-auto" to="/home">
                                Profiles
                            </Nav.Link>
                            <Nav.Link className="mx-auto" to="/work">
                                Posts
                            </Nav.Link>
                            <Nav.Link className="mx-auto" to="/gallery">
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
