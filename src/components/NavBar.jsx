import React, { useState } from "react";
import {
    Navbar,
    Container,
    Row,
    Col,
    Nav,
    Form,
    Button,
    Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { storage, auth } from "../firebase";
import logo from "../DALICHAT.png";
import { v4 as uuidv4 } from "uuid";

const NavBar = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [showAboutModal, setShowAboutModal] = useState(true);

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
            <Navbar className="navbar nav" expand="md">
                <Container>
                    <Navbar.Brand>
                        DALIChat
                        <img
                            src={logo}
                            alt="logo"
                            width="40"
                            height="40"
                            className="ms-3"
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
                            <div>
                                <Button
                                    variant="outline-secondary"
                                    onClick={() => setShowAboutModal(true)}
                                    className="m-2"
                                >
                                    About
                                </Button>
                            </div>

                            {props.user ? (
                                <div>
                                    <Button
                                        variant="secondary"
                                        onClick={() => {
                                            auth.signOut();
                                        }}
                                        className="m-2"
                                    >
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button
                                        variant="secondary"
                                        onClick={() => setShowSignInModal(true)}
                                        className="m-2"
                                    >
                                        Sign In
                                    </Button>
                                    <Button
                                        variant="secondary"
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

                            {props.username === "" ||
                            props.email === "" ||
                            props.password === "" ||
                            !props.profilePic ? (
                                <Button
                                    onClick={register}
                                    variant="primary"
                                    type="submit"
                                    disabled
                                >
                                    Register
                                </Button>
                            ) : (
                                <Button
                                    onClick={register}
                                    variant="primary"
                                    type="submit"
                                >
                                    Register
                                </Button>
                            )}
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
                                variant="primary"
                                type="submit"
                            >
                                Sign In
                            </Button>
                        </Form>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal
                size="lg"
                show={showAboutModal}
                onHide={() => setShowAboutModal(false)}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        DALIChat
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-4">
                    <Container>
                        <Row>
                            <Col className="text-center">
                                <h1>Welcome to DALIChat!</h1>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="text-center">
                                <p>
                                    DALIChat is a social media platform for
                                    users to learn about DALI Lab members and
                                    talk about the DALI Lab. You can click on
                                    member profiles, post, comment on posts,
                                    react to posts, and view your own posts on
                                    DALIChat. Feel free to email{" "}
                                    <b>thomas.s.fenaroli.24@dartmouth.edu</b>{" "}
                                    with any questions. Chat away!
                                </p>
                            </Col>
                        </Row>
                        <ul className="mt-3 list-group">
                            <li className="list-group-item">
                                Check out the <b>Members</b> page to learn about
                                current DALI Lab members!
                            </li>
                            <li className="list-group-item">
                                Check out the <b>Feed</b> page to see your
                                current social media feed, make posts, comment
                                on posts, and react to posts!
                            </li>
                            <li className="list-group-item">
                                Check out the <b>Account</b> page to see what
                                you've posted on DALI Chat!
                            </li>
                        </ul>
                        <Row className="mt-4">
                            <Col className="text-center">
                                <p className="my-auto">
                                    <b>
                                        To post, comment, react to posts, or
                                        view your account, you must
                                        register/sign in!
                                    </b>
                                </p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    );
};

export default NavBar;
