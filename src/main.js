
import './style.css'
import React from 'react'
import ReactDOM from 'react-dom/client';

function App(){
  return React.createElement(
    "div",
    {className:"text-3xl fond-bold text-purple-600"},
    "Olá mundo com React Puro + Vite + Tailwind!"
  );
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(React.createElement(App));
