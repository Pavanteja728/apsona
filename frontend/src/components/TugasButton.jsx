/* eslint-disable react/prop-types */


import Button from "./Button";
import { Trash2 } from "lucide-react";
import { CheckSquare } from "lucide-react";

export default function TugasButton({ tugasku, onEdit, onDelete, onClick }) {
  return (
    <Button
      className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium !text-black ${
        tugasku.STATUS
          ? "bg-blue-200 hover:bg-blue-300"
          : "bg-red-300 hover:bg-red-400"
      }`}
      onClick={() => onClick(tugasku)}
    >
      <div className="flex-grow text-black">{tugasku.NAME}</div>
      <button
        className="p-1 rounded-full hover:bg-gray-200 transition duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(tugasku.id);
        }}
      >
        <Trash2 className="w-6 h-6" />
      </button>
      <button
        className="p-1 rounded-full hover:bg-gray-200 transition duration-300"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(tugasku);
        }}
      >
        <CheckSquare className="w-5 h-5" />
      </button>
    </Button>
  );
}


