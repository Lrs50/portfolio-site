import React from 'react'
import Card from './components/Cardproject'

function Botao(){
    return <button className="bg-blue-500 text-white px-4 py-2 rounded"> Click me </button>
}

export default function App(){
    const projetos = [
        { title: 'Portfólio', desc: 'Site pessoal em React' },
        { title: 'Bot WhatsApp', desc: 'Automatização de finanças' },
        { title: 'Forecast Café', desc: 'Previsão de preços com IA' },
      ];
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-purple-600">
                Não tem como, React sem JSX fica muito espaguete
            </h1>
            <Botao/>
            <div className='flex gap-4'>
                {projetos.map((p) =>
                (<Card title={p.title} desc={p.desc}/>)
                )}
            </div>
        </div>
    );
}