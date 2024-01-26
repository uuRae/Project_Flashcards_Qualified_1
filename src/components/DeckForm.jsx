import React from "react";

// Component to be used in both the Add Deck and Edit Deck Screens

function DeckForm({ deck, handleChange, handleCancel}) {

    return (
        <div>
            <div className="form-group">
                <label>Name</label>
                <input
                    id="name"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={deck.name}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    onChange={handleChange}
                    type="text"
                    value={deck.description}
                />
            </div>
            <button
                className="btn btn-secondary mx-1"
                onClick={() => handleCancel()}
            >
                Cancel
            </button>
            <button className="btn btn-primary mx-1" type="submit">
                Submit
            </button>
        </div>
    );
}

export default DeckForm;