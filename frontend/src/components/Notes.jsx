/* eslint-disable react/prop-types */
const Notes = ({ note, deleteNote, handleEdit }) => {
    return (
      <div
        key={note.id}
        className={` rounded-lg shadow-md p-8 border border-white overflow-hidden`}
      >
        <h3
          style={{ wordWrap: "break-word" }}
          className="text-xl font-semibold mb-2"
        >
          {note.title}
        </h3>
        <p style={{ wordWrap: "break-word" }}>{note.content}</p>
        <div className="mt-2 flex justify-end">
          <button
            onClick={() => handleEdit(note)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
          >
            Hapus
          </button>
        </div>
      </div>
    );
  };
  
  export default Notes;
  