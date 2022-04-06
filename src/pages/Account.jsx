import React from "react";

export default function Account(props) {
    return (
        <div className="d-flex justify-content-center">
            {props.user ? (
                <h1 className="mt-5">Signed in as: {props.user?.email}</h1>
            ) : (
                <h1 className="mt-5">Sign In to view your account!</h1>
            )}
        </div>
    );
}
