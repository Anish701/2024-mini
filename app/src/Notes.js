import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

const Notes = () => {
    const [userName, setUserName] = useState('');
    const [newNote, setNewNote] = useState("");
    const [prevNotes, setPrevNotes] = useState([]);

    useEffect(() => {
        if (auth.currentUser) {
            setUserName(auth.currentUser.displayName);
            fetchPrevNotes();
        }
    }, []);

    const fetchPrevNotes = async () => {
        const q = query(
            collection(db, 'notes'),
            where('uid', '==', auth.currentUser.uid),
            orderBy('createdAt', 'desc')
        );
        const qRes = await getDocs(q);
        const fetched = qRes.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setPrevNotes(fetched);
    };

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            await addDoc(collection(db, 'notes'), {
                uid: auth.currentUser.uid,
                note: e.target.value,
                createdAt: new Date(),
            });
            setNewNote(e.target.value);
            fetchPrevNotes()
            e.target.value = '';
        }
    };

    return (
        <div className="Notes" style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Here are your notes, {userName}</h1>
            <div style={{ textAlign: 'left', maxWidth: '20%', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center' }}>Your Notes:</h2>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {prevNotes.map((note) => (
                        <li key={note.id} style={{ border: '1px solid', margin: '10px', padding: '10px' }}>
                            {note.note}
                        </li>
                    ))}
                </ul>
            </div>
            <input
                placeholder="Write New Note"
                type="text"
                onKeyDown={handleKeyDown}
            />
        </div>
    );
};

export default Notes;