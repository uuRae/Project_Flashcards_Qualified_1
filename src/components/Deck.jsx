import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api/index";
import Breadcrumb from "../Layout/Breadcrumb";

function Deck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      const deckResponse = await readDeck(deckId, abortController.signal);
      setDeck(deckResponse);
      setCards(deckResponse.cards);
      return () => {
        abortController.abort();
      };
    }
    fetchData();
  }, [deckId]);

  async function handleDeleteDeck(deck) {
    if (window.confirm(`Are you sure you want to delete this deck?`)) {
      await deleteDeck(deck.id);
      history.push("/");
    }
  }

  async function handleDeleteCard(card) {
    if (window.confirm(`Are you sure you want to delete this card?`)) {
      await deleteCard(card.id);
      history.push("/");
    }
  }

  async function handleEditDeck() {
    history.push(`/decks/${deckId}/edit`);
  }

  async function handleStudy() {
    history.push(`/decks/${deckId}/study`);
  }

  async function handleAddCard() {
    history.push(`/decks/${deckId}/cards/new`);
  }

  async function handleEditCard(card) {
    history.push(`/decks/${deckId}/cards/${card.id}/edit`);
  }

  return (
    <div>
      <Breadcrumb crumbs={["Home", "Deck"]} currentDeck={deck} />
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{deck.name}</h2>
          <p>{deck.description}</p>
          <button
            onClick={() => handleEditDeck()}
            className="btn btn-secondary mx-1"
          >
            Edit
          </button>
          <button
            onClick={() => handleStudy()}
            className="btn btn-primary mx-1"
          >
            Study
          </button>
          <button
            onClick={() => handleAddCard()}
            className="btn btn-primary mx-1"
          >
            + Add Card
          </button>
          <button
            onClick={() => handleDeleteDeck(deck)}
            className="btn btn-danger mx-1 oi oi-trash"
          />
        </div>
      </div>
      <h1>Cards</h1>
      {cards.map((card) => {
        return (
          <div className="card-deck" key={card.id}>
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col">{card.front}</div>
                  <div className="col">{card.back}</div>
                </div>
                <div className="container row">
                  <button
                    onClick={() => handleEditCard(card)}
                    className="btn btn-secondary mx-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCard(card)}
                    className="btn btn-danger mx-1"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Deck;
