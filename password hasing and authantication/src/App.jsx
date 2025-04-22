import { useState, useEffect } from "react";

function App() {
  const [formdata, setformData] = useState({ name: '', password: '', email: '' })
  const [Users, setUsers] = useState([])

  // useEffect(() => {
  //   fetchData();
  // }, [Users])


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
    })
      .catch(err => {
        console.log(`submission failed ${err}`);
      })
    setformData({ name: '', password: '', email: '' });
  }

  const checkUser = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formdata)
    }).then(async res => {
      const data = await res.json();
      if (res.ok) {
        alert(`${data.message}`);
      } else {
        alert(`login failed : ${data.message}`);
      }
    }).catch(err => { console.log(`err ${err}`); alert(`user not found`) })
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

  const handleDelete = async (id) => {
    if (prompt(`enter pin to delete the user`) == '123') {
      fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE"
      }).then((res) => { res.json(); alert(`user deleted `) }).catch(err => console.log(`error ${err}`))
    }
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
          className="border-black border-2 my-1.5 mx-2 rounded-2xl py-1 px-2"
        /> <br />

        <label className="p-2 mx-4" htmlFor="name">email : </label>
        <input type="text"
          value={formdata.email}
          onChange={handleChange}
          name="email"
          placeholder="enter your email address"
          className="border-black border-2 mx-2 my-4 rounded-2xl py-1 px-2"
        /> <br />

        <label className="p-2 " htmlFor="password">password : </label>
        <input type="password"
          name="password"
          onChange={handleChange}
          value={formdata.password}
          placeholder="enter your password"
          className="border-black border-2 rounded-2xl py-1 px-2" /> <br />
        <div className="text-right">
          <button onClick={handlesubmit} className="mx-2 px-2 py-1 rounded-full border-black border-2 my-4 bg-blue-800 text-white">
            sign up
          </button>
          <button onClick={checkUser} className="mx-2 px-2  py-1 rounded-full border-black border-2 my-4 bg-green-600 text-white">
            login
          </button>
        </div>

      </form>
    </div>
    <div className="data">
      <button onClick={fetchData} className="bg-fuchsia-600 text-white p-1.5 border-black border-2 rounded-full">Fetch Data</button>

      <h2 className="text-lg my-2">User information</h2>

      <table className="my-2  w-[50vw] m-auto">

        <thead >
          <tr>
          <td className="border-black border-2 px-2 py-2 w-36 font-bold text-lg">Username</td>
          <td className="border-black border-2 px-2 py-2 w-36 font-bold text-lg">Email</td>
          <td className="border-black border-2 px-2 py-2 w-36 font-bold text-lg">Action</td>
          </tr>
        </thead>

        <tbody>
          {Users.length > 0 && Users.map((user, index) => {
            return (
              <tr key={index}>
                <td className="border-black border-2 px-2 py-1.5 w-36  text-lg" >{user.name}</td>
                <td className="border-black border-2 px-2 py-1.5 w-36  text-lg" >{user.email}</td>
                <td onClick={() => { handleDelete(user._id) }} className="border-black border-2 px-2 py-1.5 w-36" ><lord-icon
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
