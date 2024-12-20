import { useState } from 'react';
import './App.css';
import Inventory from './components/Inventory/Inventory';
import IconButton from '@mui/material/IconButton';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import LogoutIcon from '@mui/icons-material/Logout';

function App() {

  const [role, setRole] = useState("admin");

  return (
    <div className="App">
      <header className="App-header">
        <span>admin</span>
        <IconButton onClick={()=>{
          setRole(prevRole => {
            return prevRole==="admin"?"user":"admin";
          });
        }}>{role==="admin"?<ToggleOffIcon fontSize="large"/>:<ToggleOnIcon color="primary" fontSize="large"/>}</IconButton>
        <span>user</span>
        <IconButton onClick={()=>alert("Logout Clicked!")}><LogoutIcon /></IconButton>
      </header>
      <Inventory role={role} />
    </div>
  );
}

export default App;
