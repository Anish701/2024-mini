import React, { useEffect, useState } from 'react';
import { auth, db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import './styles.css';

const Notes = () => {
	const [userName, setUserName] = useState('');
	const [scores, setScores] = useState([]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				setUserName(user.displayName);
				fetchScores();
			}
		});

		return () => unsubscribe();
	}, []);

	const fetchScores = async () => {
		const qRes = await getDocs(collection(db, 'scores'));
		const fetchedScores = qRes.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		console.log(fetchedScores)
		setScores(fetchedScores);
	};

	return (
		<div className="Scores" style={{ textAlign: 'center', marginTop: '100px' }}>
			<h1>Hello, {userName}</h1>
			<div style={{ textAlign: 'left', maxWidth: '50%', margin: '0 auto' }}>
				<h2 style={{ textAlign: 'center' }}>Here are your scores:</h2>
				<ul style={{ listStyleType: 'none', padding: 0 }}>
					{scores.map((score) => (
						<li key={score.id} style={{ border: '1px solid', margin: '10px', padding: '10px' }}>
							<pre>{JSON.stringify(score, null, 2)}</pre>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Notes;
