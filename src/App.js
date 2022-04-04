import React, { useState, useEffect } from 'react';
import './App.css';
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
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				console.log(authUser);
				setUser(authUser);
			}
			else {
				setUser(null);
			}
		});
		return () => {
			unsubscribe();
		}
	}, [user, username]);

	return (
		<Router>
			{/* <h1>Signed in as: (username){username} and (user.displayName){user ? (user.displayName) : ("user null")}</h1> */}
			<Header />
			<NavBar user={user} setUser={setUser} setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} username={username} email={email} password={password} />
			<Container>
				<Routes>
					<Route path="/">
						<Route index element={<Feed user={user} />} />
						<Route path="feed" element={<Feed username={user?.displayName} />} />
						<Route path="members" element={<Members />} />
						<Route path="account" element={<Account user={user} />} />
					</Route>
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
