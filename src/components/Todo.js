import React from "react";
import { useState } from "react";
import {
  Button,
  Avatar,
  List,
  Modal,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ImageIcon,
  InputLabel,
  Input,
  FormControl,
} from "@material-ui/core";
import "./Todo.css";
import db from "../firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [deadLine, setDeadLine] = useState("");

  const updateTodo = () => {
    //update the todo with the new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
        deadLine: deadLine,
      },
      { merge: true }
    );
    setOpen(false);
  };

  console.log(props.todo);
  return (
    <>
      <Modal
        open={open}
        onClose={(e) => {
          setOpen(false);
        }}
        className="modal"
      >
        <ModalContainer>
          <div className="modal-content">
            <h2 className="modal-heading">Update Your Task here</h2>
            <TakeTask>
              <FormControl>
                <InputLabel>Enter your updated task:</InputLabel>
                <Input
                  placeholder={props.todo.todo}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="modal-input"
                />
              </FormControl>
            </TakeTask>
            <TakeDeadLine>
              <FormControl>
                <InputLabel>Update Deadline:</InputLabel>
                <Input
                  placeholder={props.todo.deadLine}
                  value={deadLine}
                  onChange={(event) => setDeadLine(event.target.value)}
                  className="modal-input"
                />
              </FormControl>
            </TakeDeadLine>
            <Button onClick={updateTodo}>Update</Button>
          </div>
        </ModalContainer>
      </Modal>
      <List className="todo__list">
        <ListItem className="todo__list-item">
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary={props.todo.deadLine}
          />

          <Button onClick={(e) => setOpen(true)} className = 'button-edit'>Edit</Button>
          <Button
            onClick={(event) =>
              db.collection("todos").doc(props.todo.id).delete()
            }
            className = 'button-delete'
          >
            <DeleteForeverIcon />
          </Button>
        </ListItem>
      </List>
    </>
  );
}

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 90px;
`;

const TakeTask = styled.div`
  width: 100%;
  margin-top: 15px;
`;

const TakeDeadLine = styled.div`
  width: 100%;
  margin-top: 15px;
`;

export default Todo;
