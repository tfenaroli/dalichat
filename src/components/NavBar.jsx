import React, { useState } from "react";
import { Navbar, Container, Nav, Form, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { storage, auth } from "../firebase";
import logo from "../DALICHAT.png";
import { v4 as uuidv4 } from "uuid";

const NavBar = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            let name = uuidv4();
            name += ".jpg";
            var newFile = new File([e.target.files[0]], name, {
                type: "image/jpg",
            });
            props.setProfilePic(newFile);
        }
    };

    const register = (event) => {
        event.preventDefault();

        storage
            .ref(`profilepics/${props.profilePic.name}`)
            .put(props.profilePic);

        auth.createUserWithEmailAndPassword(props.email, props.password)
            .then((authUser) => {
                authUser.user.updateProfile({
                    displayName: props.username,
                    photoURL: props.profilePic.name,
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
                        <img
                            src={logo}
                            alt="logo"
                            width="40"
                            height="40"
                            className=""
                        />
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
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => {
                                        auth.signOut();
                                    }}
                                    className="m-2"
                                >
                                    Sign Out
                                </Button>
                            ) : (
                                <div>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowSignInModal(true)}
                                        className="m-2"
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        variant="outline-secondary"
                                        onClick={() => setShowModal(true)}
                                        className="m-2"
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
                        Register for DaliChat!
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
                            <Form.Group className="mb-3">
                                <Form.Label>Profile Picture</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="file"
                                    onChange={handleChange}
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
                                variant="primary"
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
                        Sign into DaliChat!
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
                                variant="primary"
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
