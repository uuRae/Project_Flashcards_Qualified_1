import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Breadcrumb = ({ crumbs, currentDeck }) => {
  const { deckId, cardId } = useParams();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const routes = [
    { path: "/", name: "Home" },
    { path: "/decks/:deckId", name: "Deck" },
    { path: "/decks/new", name: "Create Deck" },
    { path: "/decks/:deckId/study", name: "Study" },
    { path: "/decks/:deckId/edit", name: "Edit Deck" },
    { path: "/decks/:deckId/cards/new", name: "Add Card" },
    { path: "/decks/:deckId/cards/:cardId/edit", name: "Edit Card" },
  ];

  const renderBreadcrumbLink = (name, path) => (
    <li
      key={name}
      className={`breadcrumb-item ${
        crumbs.indexOf(name) === crumbs.length - 1 ? "active" : ""
      }`}
    >
      {crumbs.indexOf(name) === crumbs.length - 1 ? (
        name
      ) : (
        <Link to={path}>{name}</Link>
      )}
    </li>
  );

  useEffect(() => {
    const abortController = new AbortController();

    async function loadBreadcrumbs() {
      try {
        const crumbArray = crumbs.map((crumb) => {
          const found = routes.find(({ name }) => name === crumb);
          if (found) {
            if (found.path.includes(":deckId")) {
              found.path = found.path.replace(":deckId", deckId);
            }
            if (found.path.includes(":cardId")) {
              found.path = found.path.replace(":cardId", cardId);
            }
            if (found.name === "Deck") {
              found.name = currentDeck.name;
            }
            if (found.name === "Edit Card") {
              found.name = `Edit Card ${cardId}`;
            }

            return renderBreadcrumbLink(found.name, found.path);
          }

          return null;
        });

        setBreadcrumbs(crumbArray.filter(Boolean));
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("loadBreadcrumbs Aborted");
        } else {
          throw error;
        }
      }
    }

    loadBreadcrumbs();

    return () => abortController.abort();
  }, [deckId, cardId, crumbs, currentDeck]);

  return <ol className="breadcrumb">{breadcrumbs}</ol>;
};

export default Breadcrumb;
