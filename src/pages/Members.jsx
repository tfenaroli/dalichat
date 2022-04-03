import React from "react";
import { Container, Row } from "react-bootstrap";
import Profile from "../components/Profile";
import memberData from "../DALI_Data.json";

export default function Members() {
    return (
        <div>
            <Container>
                <Row>
                    {memberData.map((member) => (
                        <Profile
                            name={member.name}
                            year={member.year}
                            picture={member.picture}
                            gender={member.gender}
                            major={member.major}
                            birthday={member.birthday}
                            role={member.role}
                            home={member.home}
                            quote={member.quote}
                            favoriteShoe={member.favoriteShoe}
                            favoriteArtist={member.favoriteArtist}
                            favoriteColor={member.favoriteColor}
                            phoneType={member.phoneType}
                        />
                    ))}
                </Row>
            </Container>
        </div>
    );
}
