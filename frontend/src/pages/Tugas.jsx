/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { AllContext } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import Button from "../components/Button";
import TugasButton from "../components/TugasButton";
import { Plus,Search } from "lucide-react";
import axios from "axios";


export default function Tugas() {
  const { token, user, navigate } = useContext(AllContext);
  const [popup, setPopup] = useState(false);
  const [taks, setTaks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [tugas, setTugas] = useState({});
  const [request, setRequest] = useState({
    name: "",
    status: false,
  });
  // const [searchQuery, setSearchQuery] = useState("");
  // const filteredTugas = taks.filter((taks) =>
  //   taks.name.includes(searchQuery.toLowerCase())
  // );

  const initialTugas = () => {
    if (!token) {
      const storedTugas = localStorage.getItem("tugas");
      if (storedTugas) {
        setTaks(JSON.parse(storedTugas));
      } else {
        const defaultTugas = [
          {
            id: 1,
            name: "Shalat ",
            status: false,
          },
          {
            id: 2,
            name: "Ngerjain Tugas ",
            status: false,
          },
          {
            id: 3,
            name: "Makan siang ",
            status: false,
          },
        ];
        setTaks(defaultTugas);
        localStorage.setItem("tugas", JSON.stringify(defaultTugas));
      }
    }
  };

  const addTugas = async (e) => {
    e.preventDefault();
    setPopup(!popup);
    if (token) {
      axios
        .post(`http://localhost:3000/api/v1/tugas/addTugas/${user}`, request, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => alert(res.data.message));
      setTugas({});
      setRequest({
        name: "",
        status: false,
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

  const getTugas = async () => {
    if (token) {
      await fetch(`http://localhost:3000/api/v1/tugas/getTugas/${user}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((res) => {
          setTaks(res.result);
        });
    }
  };

  const onEdit = (tugas) => {
    setEdit(true);
    setPopup(!popup);
    setTugas(tugas);
  };

  const editTugas = async (e) => {
    e.preventDefault();
    setEdit(false);
    if (token) {
      axios
        .put(
          `http://localhost:3000/api/v1/tugas/editTugas/${user}/${tugas.id}`,
          request,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          alert(res.data.message);
        });
      setEdit(false);
      setPopup(!popup);
      setTugas({});
      setRequest({
        name: "",
        status: false,
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

  const deleteTugas = async (id) => {
    if (token) {
      if (confirm(`Yakin Ingin Menghapus Tugas?`)) {
        await fetch(`http://localhost:3000/api/v1/tugas/deleteTugas/${id}`, {
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
  const handleClick = async (tugas) => {
    setTugas(tugas);
    if (token) {
      axios
        .put(
          `http://localhost:3000/api/v1/tugas/clickTugas/${tugas.id}`,
          tugas,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((res) => {
          alert(res.data.message);
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

  useEffect(() => {
    addTugas;
    editTugas;
    initialTugas();
    getTugas();
    handleClick;
  }, token ? [initialTugas, addTugas, editTugas, getTugas] : []);

  if (token) {
    return (
      <div className="h-screen flex flex-col">
        <div className="border-t border-gray-400 p-1 flex gap-1">
          <Button
            onClick={() => setPopup(!popup)}
            className="bg-blue-600  hover:bg-yellow-400"
          >
            Add
            <Plus className="mr-2" />
          </Button>
          {/* <div className="flex-grow flex items-center ">
            <input
              placeholder="Search"
              className="flex-grow bg-slate-100 p-3  "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search />
          </div> */}
        </div>
        <main className="overflow-y-auto flex-grow  divide-x divide-gray-400 flex">
          <div className="flex-grow">
            <strong>List Tugasku (Belum Selesai)</strong>
            <div className="overflow-y-auto flex flex-col gap-1 p-5">
              {
              // filteredTugas
              //   .filter((tugasku) => !tugasku.status)
                taks.filter((tugasku) => tugasku.STATUS == false).map((tugasku) => (
                  <TugasButton
                    key={tugasku.id}
                    tugasku={tugasku}
                    onDelete={deleteTugas}
                    onClick={handleClick}
                    onEdit={onEdit}
                  />
                ))
                }
            </div>
          </div>
          <div className="flex-grow">
            <strong>List Tugasku (Selesai)</strong>
            <div className="overflow-y-auto flex flex-col gap-1 p-1">
              {
              // filteredTugas
              //   .filter((tugasku) => tugasku.status)
              taks.filter((tugasku) => tugasku.STATUS).map((tugasku) => (
                <TugasButton
                  key={tugasku.id}
                  tugasku={tugasku}
                  onDelete={deleteTugas}
                  onClick={handleClick}
                  onEdit={onEdit}
                />
              ))
                }
            </div>
          </div>
        </main>
        {popup && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <form
              className="bg-white p-8 rounded flex flex-col gap-4"
              action="/tugas"
              onSubmit={edit ? editTugas : addTugas}
            >
              <div className="flex flex-col gap-6 p-5 text-center">
                <label htmlFor="name">
                  {edit ? "Edit Tugas" : "Tugas Baru"}
                </label>
                <input
                  name="name"
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                  required
                  placeholder="Nama Tugas"
                  autoFocus
                  defaultValue={tugas.name ? tugas.name : ""}
                  onChange={(e) =>
                    setRequest({ ...request, name: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => {
                    setPopup(!popup);
                    setEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <button>
                  <Button>Save</Button>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="h-screen flex flex-col">
        <div className="border-t border-gray-400 p-1 flex gap-1">
          <Button
            onClick={() => setPopup(!popup)}
            className="bg-blue-600  hover:bg-yellow-400"
          >
            Add
            <Plus className="mr-2" />
          </Button>
          {/* <div className="flex-grow flex items-center ">
            <input
              placeholder="Search"
              className="flex-grow bg-slate-100 p-3  "
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search />
          </div> */}
        </div>
        <main className="overflow-y-auto flex-grow  divide-x divide-gray-400 flex">
          <div className="flex-grow">
            <strong>List Tugasku (Belum Selesai)</strong>
            <div className="overflow-y-auto flex flex-col gap-1 p-5">
              {
              // filteredTugas
              //   .filter((tugasku) => !tugasku.status)
                taks.map((tugasku) => (
                  <TugasButton
                    key={tugasku.id}
                    tugasku={tugasku}
                    onDelete={deleteTugas}
                    onClick={handleClick}
                    onEdit={onEdit}
                  />
                ))}
            </div>
          </div>
          <div className="flex-grow">
            <strong>List Tugasku (Selesai)</strong>
            <div className="overflow-y-auto flex flex-col gap-1 p-1">
              {
              // filteredTugas
              //   .filter((tugasku) => tugasku.status)
                taks.map((tugasku) => (
                  <TugasButton
                    key={tugasku.id}
                    tugasku={tugasku}
                    onEdit={onEdit}
                    onDelete={deleteTugas}
                    onClick={handleClick}
                  />
                ))}
            </div>
          </div>
        </main>
        {popup && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <form
              className="bg-white p-8 rounded flex flex-col gap-4"
              action="/tugas"
              onSubmit={edit ? editTugas : addTugas}
            >
              <div className="flex flex-col gap-6 p-5 text-center">
                <label htmlFor="name">
                  {edit ? "Edit Tugas" : "Tugas Baru"}
                </label>
                <input
                  name="name"
                  type="text"
                  className="border border-gray-300 rounded px-3 py-2 w-full mb-2"
                  required
                  placeholder="Nama Tugas"
                  autoFocus
                  defaultValue={tugas.name ? tugas.name : ""}
                  onChange={(e) =>
                    setRequest({ ...request, name: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-between">
                <Button
                  onClick={() => {
                    setPopup(!popup);
                    setEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <button>
                  <Button>Save</Button>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
