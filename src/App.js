import React, { useState } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from 'react-bootstrap';
import memberData from './DALI_Data.json'
import Header from './components/Header';
import Profile from './components/Profile';
import NavBar from './components/NavBar';

function App() {
	// console.log(memberData);
	// const [profiles, setProfiles] = useState([
	// {
	// 	name: "Thomas Fenaroli",
	// 	year: "Dartmouth '24",
	// 	picture: "https://picsum.photos/200"
	// },
	// {
	// 	name: "Zhoucai Ni",
	// 	year: "Dartmouth '24",
	// 	picture: "https://picsum.photos/200"
	// }
	// ]);
	return (
		<div className="App">
			<Header />
			<NavBar />
			<Container>
				<Row>
					{
						memberData.map(member => (
							<Profile name={member.name} year={member.year} picture={member.picture} gender={member.gender} major={member.major} birthday={member.birthday} role={member.role} home={member.home} quote={member.quote} favoriteShoe={member.favoriteShoe} favoriteArtist={member.favoriteArtist} favoriteColor={member.favoriteColor} phoneType={member.phoneType} />
						))
					}
				</Row>
			</Container>
		</div >
	);
}

export default App;
