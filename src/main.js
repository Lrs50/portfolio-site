
import React from 'react'
import ReactDOM from 'react-dom/client';

function App(){
  return React.createElement(
    "div",
    {className:"text-2xl text-blue-600"},
    "Olá mundo com React Puro!"
  );
}


const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(React.createElement(App));
