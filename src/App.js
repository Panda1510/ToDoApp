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
  const [deadLine, setDeadLine] = useState("");

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
              deadLine: doc.data().deadLine,
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
      deadLine: deadLine,
    });
    setInput("");
    setDeadLine('');
  };

  return (
    <Container>
      <div className="App">
        <h2 className = "main-heading">Manage you tasks here</h2>
        <FormStyle>
          <TakeTask>
            <FormControl>
              <InputLabel>Write a task</InputLabel>
              <Input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                 className = 'form-input'
              />
            </FormControl>
          </TakeTask>
          <TakeDeadLine>
            <FormControl>
              <InputLabel>Write Deadline</InputLabel>
              <Input
                value={deadLine}
                onChange={(event) => setDeadLine(event.target.value)}
                className = 'form-input'
              />
            </FormControl>
          </TakeDeadLine>
          <SubmitTodo>
            <Button
              disabled={!input || !deadLine}
              variant="contained"
              color="primary"
              type="submit"
              onClick={addTodo}
            >
              Add Task
            </Button>
          </SubmitTodo>
        </FormStyle>

        <MyList>
          {todos.map((todo) => (
            <Todo todo={todo}></Todo>
          ))}
        </MyList>
      </div>
    </Container>
  );
}

const Container = styled.div`
  border-radius: 10px;
  background-color: white;
  height: 90%;
  width: 50%;
  padding-bottom: 20px;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 80%;
  }
  text-align: center;
  h2 {
    color: rgba(0, 0, 0, 0.5);
    padding-top: 15px;
    margin-top: 8%;
  }
`;

const TakeTask = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const TakeDeadLine = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const SubmitTodo = styled.div`
  width: 100%;
  margin-top: 25px;
  margin-bottom: 20px;
`;

const FormStyle = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const MyList = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
`;
export default App;
