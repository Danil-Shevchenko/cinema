export default function Header({search, setSearch}) {
  
  const handleChange = (e) =>{
    setSearch(e.target.value)
  }

  return (
    <header>
      <img src="" alt="logo"/>
      <input type="text" value={search} onChange={handleChange}/>
    </header>
  )
}

