import "./App.css";
import { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  FormControl,
  Input,
  InputLabel,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import styled from "styled-components";
import Todo from "./components/Todo";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when the app loads, we need to listen to the database and fetch new todos as they get added/removed
  //Runs once when the app loads
  useEffect(() => {
    //this code fires when the app.js loads
    return () => {
      db.collection("todos")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot.docs.map((doc) => doc.data().todo));
          setTodos(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              todo: doc.data().todo,
            }))
          );
        });
    };
  }, [input]); // and by adding ,[input]: useEffect fires as well

  const addTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>Hello World</h1>
      <form>
        <FormControl>
          <InputLabel>Write a task</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>

        <Button
          disabled={!input}
          variant="contained"
          color="primary"
          type="submit"
          onClick={addTodo}
        >
          Add todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo}></Todo>
        ))}
      </ul>
    </div>
  );
}

export default App;
