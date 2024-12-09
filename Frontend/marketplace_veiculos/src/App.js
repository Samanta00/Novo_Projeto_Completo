

import React from'react';
import Cabecalho from './paginas/cabecalho';
import Dashboard from './paginas/dashboard';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
          <Cabecalho/>
          <Dashboard/>
        </>
      </header>
    </div>
  );
}

export default App;
