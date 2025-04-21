import { useState, useEffect } from "react";

function App() {
  const [formdata, setformData] = useState({ name: '', password: '' })
  const [Users, setUsers] = useState([])

  useEffect(() => {
    fetchData();
  }, [Users])


  function handlesubmit(event) {
    event.preventDefault()
    fetch('http://localhost:3000/submit', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    }).then(res => {
      res.json();
      alert(`user data saved`);
    })
      .catch(err => {
        alert('data not send');
        console.log(`error ${err}`);
      })
    setformData({ name: '', password: '' });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const fetchData = async () => {
    //now here we have to  take data from database
    try {
      const response = await fetch(`http://localhost:3000/getapi`)
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.log(`error : ${err}`);
    }
  }

  const handleDelete = async (id)=>{
    fetch(`http://localhost:3000/delete/${id}`, {
      method: "DELETE"
    }).then((res)=>{res.json(); alert(`user deleted `)}).catch(err=>console.log(`error ${err}`))
  }

  return <div className="text-center">

    <div className="border-2 border-black pt-4 w-[30vw] mx-auto my-10  rounded-xl">
      <form>
        <label className="p-2 mx-4" htmlFor="name">name : </label>
        <input type="text"
          value={formdata.name}
          onChange={handleChange}
          name="name"
          placeholder="enter your username"
          className="border-black border-2 m-2 rounded-2xl py-1 px-2"
        /> <br />

        <label className="p-2 " htmlFor="password">password : </label>
        <input type="password"
          name="password"
          onChange={handleChange}
          value={formdata.password}
          placeholder="enter your password"
          className="border-black border-2 rounded-2xl py-1 px-2" /> <br />

        <button onClick={handlesubmit} className="px-2 py-1 rounded-full border-black border-2 my-4 bg-green-600 text-white">
          submit
        </button>

      </form>
    </div>
    <div className="data">
      <button onClick={fetchData} className="bg-fuchsia-600 text-white p-1.5 border-black border-2 rounded-full">Fetch Data</button>

      <h2 className="text-lg my-2">User information</h2>

      <table className="my-2  w-[50vw] m-auto">

        <thead >
          <tr>
            <td className="border-black border-2 px-2 py-2 w-36 font-bold text-lg">Name</td>
            <td className="border-black border-2 px-2 py-2 w-36 font-bold text-lg">Password</td>
            <td className="border-black border-2 px-2 py-2 w-36 font-bold text-lg">Action</td>
          </tr>
        </thead>

        <tbody>
          {Users.length > 0 && Users.map((user, index) => {
            return (
              <tr key={index}>
                <td className="border-black border-2 px-2 py-1.5 w-36" >{user.name}</td>
                <td className="border-black border-2 px-2 py-1.5 w-36" >{user.password}</td>
                <td onClick={()=>{handleDelete(user._id)}} className="border-black border-2 px-2 py-1.5 w-36" ><lord-icon
                  src="https://cdn.lordicon.com/hwjcdycb.json"
                  trigger="hover"
                  stroke="bold"
                  colors="primary:#121331,secondary:#000000"
                  >
                </lord-icon></td></tr>
        );
          })}
      </tbody>
    </table>

  </div >

  </div >
}

export default App;
