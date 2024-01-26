import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";
import Breadcrumb from "../Layout/Breadcrumb";

function EditDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);

  useEffect(() => {
    async function getDeck() {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    getDeck();
  }, [deckId]);

  function handleChange({ target }) {
    setDeck({
      ...deck,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    if (
      deck.name === "" ||
      deck.name === undefined ||
      deck.description === "" ||
      deck.description === undefined
    ) {
      alert("Please fill in name and description");
      return;
    }
    const response = await updateDeck({ ...deck }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  async function handleCancel() {
    history.push(`/decks/${deckId}`);
  }
  if (!deck) return null;

  return (
    <div>
      <Breadcrumb crumbs={["Home", "Deck", "Edit Deck"]} currentDeck={deck} />
      <form onSubmit={handleSubmit}>
        <h1>Edit Deck</h1>

        <DeckForm
          deck={deck}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      </form>
    </div>
  );
}

export default EditDeck;
