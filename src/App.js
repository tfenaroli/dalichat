import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
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
		</Router>
	);
}

export default App;
