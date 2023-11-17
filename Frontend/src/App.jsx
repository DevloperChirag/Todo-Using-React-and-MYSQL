import { useEffect, useState } from "react";
import axios from "axios";
import  "./App.css";

function App() {
  let arr = [];
  const [Task, setTask] = useState("");
  const [ShowTask, setShowTask] = useState([]);

  useEffect(() => {
      try {
        axios
          .get("http://localhost:8081/tasks")
          .then((response) => {
            response.data.map((d) => {
              arr.push(d.name);
            });
            setShowTask(arr);
          })
          .catch((err) => {
            console.log("something wrong", err);
          });
      } catch (error) {
        console.log("Fetch na hua", error);
      }
  },[arr]);

  const submitHandler = () => {
    if (Task !== "") {
      setShowTask([...ShowTask, { Task }]);
      setTask("");
    }
  };
  //  Send Data written in input box to server File(server.js)
  const sendData = async () => {
    try {
      if (Task !== "") {
        let response = await axios.post("http://localhost:8081/getData", {
          Task: Task,
        });
        console.log("Server Response", response.data);
        window.location.reload(true);
      }
    } catch (error) {
      console.error("Error sending data to the server:", error);
    }
  };
  // Delete the Displayed tasks
  const deleteHandler = async (i) => {
    let copytask = [...ShowTask];
    let deleteTask = copytask.splice(i, 1)[0];
    console.log(deleteTask);
     let response = await axios.post("http://localhost:8081/deleteData",{deleteTask: deleteTask });
    console.log("Server Response", response.data);
    window.location.reload(true);
  };
  // Display the Tasks from Tasks Array
  let renderTask = <h2 className=" bg-slate-400 border-1 my-4 rounded px-4 py-4 border-black">No Task Available</h2>;
  if (ShowTask.length > 0) {
    renderTask = ShowTask.map((t, i) => {
      return (
        <li className="flex bg-slate-400 border-1 my-4 rounded px-4 border-black items-center justify-between" key={i}>
          <h5 className="text-lg ">{t}</h5>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="rounded text-white font-semibold cursor-pointer hover:bg-red-700 mx-2 my-1 px-1 py-1"
          >
            ❌
          </button>
        </li>
      );
    });
  }

  return (
    <>
      <div className="h-20 bg-red-500 text-center text-white text-6xl py-2 font-bold">
        To Do List App
      </div>
      <div onClick={submitHandler} className="flex bg-red-500 text-center justify-center ">
        <input
          type="text"
          value={Task}
          onChange={(e) => {
            setTask(e.target.value);
          }}
          className="w-1/2 border-zinc-700 border-2 my-4 px-4 py-2 rounded-full"
          placeholder="Enter Your Task Here"
        />
        <button
          onClick={sendData}
          className="bg-green-600 rounded text-white font-semibold cursor-pointer hover:bg-green-700 mx-4 my-4 px-4 py-2"
        >
          Add Task
        </button>
      </div>
      <div className=" mx-72 my-4 px-4 py-2 rounded-md text-white">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
}

export default App;
