import React from "react";
import { useParams, useHistory } from "react-router-dom";

function CardForm({ card, handleChange }) {
  const { deckId } = useParams();
  const history = useHistory();

  return (
    <div>
      <div className="form-group">
        <label htmlFor="cardFront">Front</label>
        <textarea
          id="cardFront"
          name="front"
          className="form-control"
          placeholder="Front side of card"
          rows="3"
          onChange={handleChange}
          value={card.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="cardBack">Back</label>
        <textarea
          id="cardBack"
          name="back"
          className="form-control"
          placeholder="Back side of card"
          rows="3"
          onChange={handleChange}
          value={card.back}
        />
      </div>
      <button
        type="button"
        className="btn btn-dark mr-2"
        onClick={() => history.push(`/decks/${deckId}`)}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </div>
  );
}

export default CardForm
;
