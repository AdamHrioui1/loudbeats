import React from 'react'
import { DataProvider } from './GlobaleContext';
import Routers from './Routers';
import './styles/App.css'

function App() {
  
  return (
    <DataProvider>
      <Routers />
    </DataProvider>
  );
}

export default App;
