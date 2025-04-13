import React from 'react'


function Botao(){
    return <button className="bg-blue-500 text-white px-4 py-2 rounded"> Click me </button>
}

export default function App(){
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-purple-600">
                Não tem como, React sem JSX fica muito espaguete
            </h1>
            <Botao/>
        </div>
    );
}