import { useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  
  return (
    <>
      <Header search={search} setSearch={setSearch}/>
      <h1>{search}</h1>
    </>
  );
}

export default App;
