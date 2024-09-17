import './noteformat'
import Add from './Add';
const NotesList = ({
	notes,
	handleAdd,
	handleDeleteNote,
}) => {
	return (
		<div className='notes-list'>
			{notes.map((noteformat) => (
				<noteformat
					id={noteformat.id}
					text={noteformat.text}
					date={noteformat.date}
					handleDeleteNote={handleDeleteNote}
				/>
			))}
			<Add handleAdd={handleAdd} />
		</div>
	);
};
export default NotesList;