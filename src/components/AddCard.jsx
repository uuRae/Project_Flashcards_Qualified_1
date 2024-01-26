import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "./CardForm";
import Breadcrumb from "../Layout/Breadcrumb";

function AddCard() {
  const { deckId } = useParams();
  const history = useHistory();
  const initialState = {
    front: "",
    back: "",
  };

  const [newCard, setNewCard] = useState(initialState);
  const [deck, setDeck] = useState({});

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      const response = await readDeck(deckId, abortController.signal);
      setDeck(response);
    }
    fetchData();
    return () => {
      setNewCard({});
    };
  }, [deckId]);

  function handleChange({ target }) {
    setNewCard({
      ...newCard,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await createCard(
      deckId,
      { ...newCard },
      abortController.signal
    );
    history.push(`/decks/${deckId}`);
    setNewCard({});
    return response;
  }

  return (
    <div>
      <Breadcrumb crumbs={["Home", "Deck", "Add Card"]} currentDeck={deck} />
      <h2>{deck.name}: Add Card</h2>
      <form onSubmit={handleSubmit}>
        <CardForm card={newCard} handleChange={handleChange} />
      </form>
    </div>
  );
}

export default AddCard;
