import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";

export default function ImageUpload(props) {
    const [caption, setCaption] = useState("");
    // const [progress, setProgress] = useState("");
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on("state_changes", (snapshot) => {
            storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((picture) => {
                    db.collection("posts").add({
                        timestamp:
                            firebase.firestore.FieldValue.serverTimestamp(),
                        caption: caption,
                        picture: picture,
                        username: props.user?.displayName,
                    });

                    setCaption("");
                    setImage(null);
                });
        });
    };

    return (
        <div>
            <h1>Upload a post to DaliChat!</h1>
            <input
                type="text"
                placeholder="caption"
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
            />
            <input type="file" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    );
}
