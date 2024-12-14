

import React from'react';
import Cabecalho from './paginas/cabecalho';
import Dashboard from './paginas/dashboard';
import AppRouter from './router';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <>
        <AppRouter/>
          {/* <Cabecalho/>
          <Dashboard/> */}
        </>
      </header>
    </div>
  );
}

export default App;
