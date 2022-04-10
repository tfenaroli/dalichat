import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Container, Modal, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import NavBar from './components/NavBar';
import Members from "./pages/Members";
import Feed from "./pages/Feed";
import Account from "./pages/Account"
import { auth } from "./firebase"

function App() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [showModal, setShowModal] = useState(true);

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				setUsername(auth.currentUser.displayName);
			}
			setUser(user);
		});
		return () => { unsub() };
	}, [user, username]);

	return (
		<Router>
			<Header />
			<Row className="mt-2">
				<Col className="text-center">
					<Button
						variant="outline-secondary"
						onClick={() => setShowModal(true)}
					>
						About DaliChat!
					</Button>
				</Col>
			</Row>

			<NavBar user={user} setUser={setUser} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
			<Container>
				<Routes>
					<Route path="/">
						<Route index element={<Feed user={user} />} />
						<Route path="feed" element={<Feed user={user} />} />
						<Route path="members" element={<Members />} />
						<Route path="account" element={<Account user={user} />} />
					</Route>
				</Routes>
			</Container>
			<Modal
				size="lg"
				show={showModal}
				onHide={() => setShowModal(false)}
				aria-labelledby="example-modal-sizes-title-sm"
			>
				<Modal.Header closeButton>
					<Modal.Title id="example-modal-sizes-title-sm">
						DaliChat
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="p-4">
					<Container>
						<Row>
							<Col className="text-center">
								<h1>Welcome to DaliChat!</h1>
							</Col>
						</Row>
						<Row className="mt-3">
							<Col className="text-center">
								<p>DaliChat is a social media platform for users to learn about DALI Lab members and talk about the DALI Lab! You can click on member profiles, post, comment on posts,
									and view your own posts on DaliChat! Feel free to email <b>thomas.s.fenaroli.24@dartmouth.edu</b> with any questions. Chat away!</p>
							</Col>
						</Row>
						<ul className="mt-3 list-group">
							<li className="list-group-item">Check out the Members page to learn about current DaliLab members!</li>
							<li className="list-group-item">Check out the Feed page to see your current social media feed, make posts, and comment on posts!</li>
							<li className="list-group-item">Check out the Account page to see what you've posted on DaliChat!</li>
						</ul>

						<Row className="mt-4">
							<Col className="text-center">
								<p className="my-auto"><b>Remember, to post, comment, and view your account, you must register or sign in!</b></p>
							</Col>
						</Row>

					</Container>
				</Modal.Body>
			</Modal>
		</Router>
	);
}

export default App;
