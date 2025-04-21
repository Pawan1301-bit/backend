import { useState } from "react";

function App() {
  const [userdetail, setuserdetail] = useState({ name: '', email: '', password: '' });
  const [Display, setDisplay] = useState(false);
  const [allUsers, setallUsers] = useState([])

  function fetchUserData() {
    fetch('http://localhost:3000/api/entries') //fetching data from our server -- connect to specific address to requestdata
      .then(res => res.json())
      .then(data => {
        setallUsers(data);
        setDisplay(true);
      }).catch(err => {
        console.log(`fetching error ${err}`);
        alert('falied to fetch data');
      });
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/entries/${id}`, {
        method: "DELETE",
      });

      if(response.ok){
        alert("user deleted succesfully");
        fetchUserData()
      }else{
        alert("Failed to delete user");
      }

    } catch (e) {
      console.error("Error deleting user:", err);
      alert("Error deleting user");
    }
  }

  function handlesubmit(e) {
    e.preventDefault(); // prevent page reload
    //connecting the fontend with the backend 
    //sending data to the backend using fetch
    fetch(`http://localhost:3000/submit-feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdetail), //sendform data as json
      // JSON.stringify convert javascript object to json string used when we send data to server
    }).then((response) => response.json())    //this convert json string to js object for reciving data from server
      .then((data) => {
        console.log("success:", data);
        alert("form submitted succesfully");
      })
      .catch((err) => {
        console.error("Error : ", err);
        alert("something went wrong!");
      })

    setuserdetail({ name: '', email: '', password: '' });
  }

  // const fetchdata = function(){
  //   // alert(`this will generate the data in table`);
  //   setDisplay(true);
  // }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setuserdetail((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };

  return (
    <>
      <div className=" h-screen text-center">
        <div className="border-black border-2 h-[45vh] w-[25vw] m-auto p-4 my-6">
          <h2 className="text-2xl font-semibold mb-4">Fill the Form</h2>
          <form onSubmit={handlesubmit}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={userdetail.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className=" border-2 border-black rounded-full p-2 my-2"
            />
            <br />
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              value={userdetail.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className=" border-2 border-black rounded-full p-2 my-2"
            />
            <br />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              value={userdetail.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border-2 border-black rounded-full p-2 my-2"
            />
            <br />
            <button
              type="submit"
              className="font-semibold bg-indigo-400 border-2 text-white border-black py-1 px-4 rounded-full mt-2"
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <button onClick={fetchUserData} className="border-black border-2 p-2 rounded-3xl bg-teal-500 text-white">fetch userdata</button>
          <div className="flex justify-center my-5">
            {Display && (
              <table>
                <thead>
                  <tr>
                    <th className="w-[15vw] border-black border-2 p-2">Name</th>
                    <th className="w-[15vw] border-black border-2 p-2">Email</th>
                    <th className="w-[15vw] border-black border-2 p-2">Password</th>
                    <th className="w-[15vw] border-black border-2 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.map((user, index) => (
                    <tr key={index}>
                      <td className="w-[10vw] border-black border-2 p-2">{user.name}</td>
                      <td className="w-[10vw] border-black border-2 p-2">{user.email}</td>
                      <td className="w-[10vw] border-black border-2 p-2">{user.password}</td>
                      <td onClick={() => { deleteUser(user._id) }} className="w-[10vw] border-black border-2 p-2">Delete</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
