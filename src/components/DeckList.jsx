import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { useHistory } from "react-router-dom";

function DeckList() {
  const history = useHistory();
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const abortController = new AbortController();
      const deckResponse = await listDecks(abortController.signal);
      setDecks(deckResponse);
    }
    fetchData();
  }, []);

  async function handleDelete(deck) {
    if (window.confirm("Are you sure you want to delete this deck?")) {
      await deleteDeck(deck.id);
      history.push("/");
      history.go(0);
    }
  }

  return (
    <div className="decks-container" style={{ width: "100%" }}>
      <button
        type="button"
        className="btn btn-success mb-3 btn-lg"
        onClick={() => history.push("/decks/new")}
      >
        <span className="oi oi-plus" /> Create Deck
      </button>
      <div className="card-deck" style={{ width: "100%" }}>
        {decks.map((deck) => {
          return (
            <div
              className="card"
              style={{ minWidth: "40%", maxWidth: "40%" }}
              key={deck.id}
            >
              <div className="card-body">
                <div className="card-title">{`${deck.name}`}</div>
                <div className="card-subtitle mb-2 text-muted">
                  {`${deck.cards.length} cards`}
                </div>
                <div className="card-text">{`${deck.description}`}</div>
                <div className="button-container">
                  <div>
                    <button
                      type="button"
                      className="btn btn-dark mr-2"
                      onClick={() => history.push(`/decks/${deck.id}`)}
                    >
                      <span className="oi oi-eye" /> View
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mr-2"
                      onClick={() => history.push(`/decks/${deck.id}/study`)}
                    >
                      <span className="oi oi-book" /> Study
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger mx-1 oi oi-trash"
                    onClick={() => handleDelete(deck)}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeckList;
