import React from "react";
import './App.css';

export default function PaginaInicial() {
  return (
    <div className='flex flex-col gap-4'>
      {/* Linha 1*/ }
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-blue-300 p-4'>Coluna A</div>
        <div className='bg-blue-400 p-4'>Coluna B</div>
      </div>

      {/* Linha 2*/ }
      <div className='grid grid-cols-3 gap-4'>
        <div className='bg-gray-300 p-4 flex-1'>Coluna 1</div>
        <div className='bg-gray-400 p-4 flex-1'>Coluna 2</div>
        <div className='bg-gray-500 p-4 flex-1'>Coluna 3</div>
      </div>

      {/* Linha 3*/ }
      <div className='grid grid-cols-2 gap-4'>
        <div className='bg-blue-300 p-4'>Coluna A</div>
        <div className='bg-blue-400 p-4'>Coluna B</div>
      </div>
    </div>
  );
}
