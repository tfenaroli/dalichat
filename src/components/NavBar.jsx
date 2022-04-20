import React, { useState } from "react";
import { Navbar, Container, Nav, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import logo from "../DALICHAT.png";

const NavBar = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);

    const register = (event) => {
        event.preventDefault();

        auth.createUserWithEmailAndPassword(props.email, props.password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: props.username,
                });
            })
            .catch((error) => alert(error.message));

        setShowModal(false);
    };

    const signIn = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(props.email, props.password).catch(
            (error) => alert(error.message)
        );

        setShowSignInModal(false);
    };

    return (
        <React.Fragment>
            <Navbar className="mt-4 navbar bg-light" expand="md">
                <Container>
                    <Navbar.Brand>
                        <img src={logo} width="40" height="40" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        className="justify-content-between"
                        id="basic-navbar-nav"
                    >
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
                        <Nav className="text-center">
                            {props.user ? (
                                <div>
                                    <Button
                                        className="m-2 text-light"
                                        onClick={() => {
                                            auth.signOut();
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        className="m-2 text-light"
                                        onClick={() => setShowSignInModal(true)}
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        className="m-2 text-light"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Register
                                    </Button>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Modal
                size="lg"
                show={showModal}
                onHide={() => setShowModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Register for DALIChat!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Enter username"
                                    type="text"
                                    value={props.username}
                                    onChange={(e) =>
                                        props.setUsername(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    placeholder="Enter email"
                                    type="email"
                                    value={props.email}
                                    onChange={(e) =>
                                        props.setEmail(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder="Enter password"
                                    type="password"
                                    value={props.password}
                                    onChange={(e) =>
                                        props.setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                onClick={register}
                                className="text-light"
                                type="submit"
                            >
                                Register
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={showSignInModal}
                onHide={() => setShowSignInModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Sign into DALIChat!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Form>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicEmail"
                            >
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    placeholder="Enter email"
                                    type="email"
                                    value={props.email}
                                    onChange={(e) =>
                                        props.setEmail(e.target.value)
                                    }
                                />
                            </Form.Group>
                            <Form.Group
                                className="mb-3"
                                controlId="formBasicPassword"
                            >
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    placeholder="Enter password"
                                    type="password"
                                    value={props.password}
                                    onChange={(e) =>
                                        props.setPassword(e.target.value)
                                    }
                                />
                            </Form.Group>

                            <Button
                                onClick={signIn}
                                className="text-light"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default NavBar;
