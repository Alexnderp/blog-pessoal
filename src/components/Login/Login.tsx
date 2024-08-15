import { X } from "@phosphor-icons/react";
import React from "react";

function Login({ children, open, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gray-800 rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-white text-lg bg-lime-400 hover:bg-gray-50 hover:text-lime-400 ">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Login;
