/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Notes from "../components/Notes";
import axios from "axios";
import { useContext } from "react";
import { AllContext } from "../App";

const Home = () => {
  const { token, user, navigate } = useContext(AllContext);

  const [edit, setEdit] = useState(false);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({});
  const [request, setRequest] = useState({
    title: null,
    content: null,
  });

  const initialNotes = () => {
    if (!token) {
      const storedNotes = localStorage.getItem("notes");
      if (storedNotes) {
        setNotes(JSON.parse(storedNotes));
      } else {
        const defaultNotes = [
          {
            id: 1,
            title: "Hari Pertama lebaran di Bandung",
            content: "Isi catatan pertama",
          },
          {
            id: 2,
            title: "Hari Kedua lebaran di Bandung",
            content: "Isi catatan kedua",
          },
          {
            id: 3,
            title: "Hari Tiga lebaran di Bandung",
            content: "isi catatan ke tiga ",
          },
        ];
        setNotes(defaultNotes);
        localStorage.setItem("notes", JSON.stringify(defaultNotes));
      }
    }
  };


  const handleChange = (e) => {
    setRequest({
      ...request,
      [e.target.name]: e.target.value,
    });
  };

  

  const addNote = async (e) => {
    e.preventDefault();
    if (token) {
      axios
        .post(`http://localhost:3000/api/v1/notes/addNotes/${user}`, request, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          alert(res.data.message);
          setNote({});
          setRequest({
            title: "",
            content: "",
          });
        });
    } else {
      return (
        <div>
          {setTimeout(() => {
            navigate("/login");
          }, 100)}
        </div>
      );
    }
  };

  const handleEdit = (note) => {
    setEdit(true);
    setNote(note);
    setRequest({
      title: note.title,
      content: note.content,
    });
  };
  const editNote = async (e) => {
    e.preventDefault();
    if (token) {
      axios
        .put(
          `http://localhost:3000/api/v1/notes/editNotes/${user}/${note.id}`,
          request,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          alert(res.data.message);
        });
      setNote({});
      setRequest({ title: "", content: "" });
      setEdit(false);
    } else {
      return (
        <div>
          {setTimeout(() => {
            navigate("/login");
          }, 100)}
        </div>
      );
    }
  };

  const deleteNote = async (id) => {
    setEdit(false);
    if (token) {
      if (confirm(`Yakin Ingin Menghapus Notes?`)) {
        await fetch(`http://localhost:3000/api/v1/notes/deleteNotes/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((res) => {
            alert(res.message);
          });
      }
    } else {
      return (
        <div>
          {setTimeout(() => {
            navigate("/login");
          }, 100)}
        </div>
      );
    }
  };

  const getNote = async () => {
    if (token) {
      await fetch(`http://localhost:3000/api/v1/notes/getNotes/${user}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          setNotes(res.result);
        });
    }
  };

  useEffect(() => {
    initialNotes();
    addNote();
    handleEdit;
    editNote;
    getNote();
  }, token ? [initialNotes, addNote, handleEdit, editNote] : []);

  if (token) {
    return (
      <div className="bg-gray-400">
        <form
          className="max-w-4xl mx-auto px-4 py-8"
          action="/"
          onSubmit={edit ? editNote : addNote}
        >
          <h1 className="text-3xl font-bold mb-4">Buat Catatan Sekarang !!!</h1>
          <div className="mb-4">
            <input
              name="title"
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
              required
              placeholder="Judul Catatan"
              defaultValue={note.title ? note.title : ""}
              onChange={handleChange}
            />
            <textarea
              name="content"
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
              required
              placeholder="Isi Catatan"
              defaultValue={note.content ? note.title : ""}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {edit ? "Simpan Perubahan" : "Tambah Catatan"}
            </button>
          </div>
        </form>
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Notes
              key={note.id}
              note={note}
              handleEdit={handleEdit}
              deleteNote={deleteNote}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-gray-400">
        <form
          className="max-w-4xl mx-auto px-4 py-8"
          action="/"
          onSubmit={edit ? editNote : addNote}
        >
          <h1 className="text-3xl font-bold mb-4">Buat Catatan Sekarang !!!</h1>
          <div className="mb-4">
            <input
              name="title"
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
              required
              placeholder="Judul Catatan"
              defaultValue={note.title ? note.title : ""}
              onChange={handleChange}
            />
            <textarea
              name="content"
              type="text"
              className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
              required
              placeholder="Isi Catatan"
              defaultValue={note.content ? note.content : ""}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              {edit ? "Simpan Perubahan" : "Tambah Catatan"}
            </button>
          </div>
        </form>
        <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Notes
              key={note.id}
              note={note}
              handleEdit={handleEdit}
              deleteNote={deleteNote}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default Home;
