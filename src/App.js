import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import NavBar from './components/NavBar';
import Members from "./pages/Members";
import Feed from "./pages/Feed";
import Account from "./pages/Account"

function App() {
	return (
		<Router>
			<Header />
			<NavBar />
			<Container>
				<Routes>
					<Route path="/">
						<Route index path="feed" element={<Feed />} />
						<Route path="members" element={<Members />} />
						<Route path="account" element={<Account />} />
					</Route>
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
