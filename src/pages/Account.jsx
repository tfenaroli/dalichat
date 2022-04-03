import React from "react";

export default function Account(props) {
    return (
        <div className="d-flex justify-content-center">
            <h1>Signed in as: {props.user?.displayName}</h1>
        </div>
    );
}
