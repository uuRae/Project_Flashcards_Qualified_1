import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "./CardForm";
import Breadcrumb from "../Layout/Breadcrumb";

function EditCard() {
  const { deckId, cardId } = useParams();
  const history = useHistory();
  const initialDeckState = {
    id: "",
    name: "",
    description: "",
  };
  const initialCardState = {
    id: "",
    front: "",
    back: "",
    deckId: "",
  };

  const [card, setCard] = useState({ initialCardState });
  const [deck, setDeck] = useState({ initialDeckState });

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      const cardResponse = await readCard(cardId, abortController.signal);
      const deckResponse = await readDeck(deckId, abortController.signal);
      setCard(cardResponse);
      setDeck(deckResponse);
    }
    fetchData();
  }, [cardId, deckId]);

  function handleChange({ target }) {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();
    const response = await updateCard({ ...card }, abortController.signal);
    history.push(`/decks/${deckId}`);
    return response;
  }

  return (
    <div>
      {" "}
      <Breadcrumb crumbs={["Home", "Deck", "Edit Card"]} currentDeck={deck} />
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <CardForm card={card} handleChange={handleChange} />
      </form>
    </div>
  );
}

export default EditCard;
