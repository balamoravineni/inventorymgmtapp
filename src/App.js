import { useState } from 'react';
import './App.css';
import Inventory from './components/Inventory/Inventory';

function App() {

  const [role, setRole] = useState("admin");

  return (
    <div className="App">
      <header className="App-header">
        <span>admin</span>
        <input type='checkbox' onClick={()=>{
          setRole(prevRole => {
            return prevRole==="admin"?"user":"admin";
          });
        }} />
        <span>user</span>
        <button>Exit</button>
      </header>
      <Inventory role={role} />
    </div>
  );
}

export default App;
