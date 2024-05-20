
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUsers] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/')
      const data = await res.json()
      setUsers(data.user)
      console.log(data)
    }
    fetchData();
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name, email })
    })

    const data = await res.text()
    console.log(data)
  }





  return (
    <div>
      
      <form onSubmit={handleSubmit}>

        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>


<div>
  <h1>Users</h1>
  {user.map(i =>(
    <p>{i.name}{i.email}</p>
  ) )}

</div>


    </div>
  )
}

export default App
