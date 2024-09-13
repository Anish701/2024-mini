import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const Notes = () => {
    const [userName, setUserName] = useState('');
    const [newNote, setNewNote] = useState("")

    useEffect(() => {
        if (auth.currentUser) {
            setUserName(auth.currentUser.displayName);
        }
    }, []);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await addDoc(collection(db, 'notes'), {
                uid: auth.currentUser.uid,
                note: e.target.value,
                createdAt: new Date(),
            });
            setNewNote(e.target.value);
            e.target.value = '';
        }
    };

    return (
        <div className="Notes" style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Here are your notes, {userName}</h1>
            <input
                placeholder="Write New Note"
                type="text"
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Notes;