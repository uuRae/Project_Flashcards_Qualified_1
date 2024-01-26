import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function CreateDeck() {
  const initialState = {
    name: "",
    description: "",
  };

  const history = useHistory();
  const [newDeck, setNewDeck] = useState(initialState);

  function handleChange({ target }) {
    setNewDeck({
      ...newDeck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    if (
      newDeck.name === "" ||
      newDeck.name === undefined ||
      newDeck.description === "" ||
      newDeck.description === undefined
    ) {
      alert("Please input new deck name and description");
      return;
    }
    const response = await createDeck({ ...newDeck }, abortController.signal);
    history.push("/");
    return response;
  }

  async function handleCancel() {
    history.push("/");
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <h1>Create Deck</h1>
        <DeckForm
          deck={newDeck}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      </form>
    </div>
  );
}

export default CreateDeck;
