import React from "react";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import PaginaInicial from "./PaginaInicial";
import Conquistas from "./pages/conquistas"; 

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Menu simples pra navegar */}
      <nav className="bg-white shadow-md p-4 flex gap-6">
        <Link to="/" className="text-blue-700 font-semibold hover:underline">
          Início
        </Link>
        <Link to="/conquistas" className="text-blue-700 font-semibold hover:underline">
          Conquistas
        </Link>
      </nav>

      {/* Rotas */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<PaginaInicial />} />
          <Route path="/conquistas" element={<Conquistas />} />
        </Routes>
      </div>
    </div>
  );
}
