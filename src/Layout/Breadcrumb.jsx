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

// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";

// /** A component containing links back to pages in the path to current page
//  *
//  *  @param {array} crumbs
//  *  an array of the pages to be in the breadcrumbed, ["foo", "bar", "etc"]
//  *  @param {object} currentDeck
//  *  stately object containing the current deck, {id, name, description}
//  *  should only exist in routes including :deckId and :cardId
//  */

// const Breadcrumb = ({ crumbs, currentDeck }) => {
//   const { deckId, cardId } = useParams();
//   const [breadcrumbs, setBreadcrumbs] = useState([]);
//   const routes = [
//     { path: "/", name: "Home" }, // Home
//     { path: "/decks/:deckId", name: "Deck" }, // Deck
//     { path: "/decks/new", name: "Create Deck" }, // CreateDeck
//     { path: "/decks/:deckId/study", name: "Study" }, // Study
//     { path: "/decks/:deckId/edit", name: "Edit Deck" }, // EditDeck
//     { path: "/decks/:deckId/cards/new", name: "Add Card" }, // AddCard
//     { path: "/decks/:deckId/cards/:cardId/edit", name: "Edit Card" }, // EditCard
//   ];

//   useEffect(() => {
//     const abortController = new AbortController();
//     async function loadBreadcrumbs() {
//       try {
//         const crumbArray = crumbs.map((crumb, key) => {
//           const found = routes.find((route) => {
//             return route.name === crumb;
//           });
//           // special cases to use names based on the specific deck or card
//           if (found.path.includes(":deckId")) {
//             found.path = found.path.replace(":deckId", deckId);
//           }
//           if (found.path.includes(":cardId")) {
//             found.path = found.path.replace(":cardId", cardId);
//           }
//           if (found.name === "Deck") {
//             found.name = currentDeck.name;
//           }
//           if (found.name === "Edit Card") {
//             found.name = `Edit Card ${cardId}`;
//           }
//           // just a name for the current page, a link for everything else
//           if (crumbs.indexOf(crumb) === crumbs.length - 1) {
//             return (
//               <li key={key} className="breadcrumb-item active">
//                 {found.name}
//               </li>
//             );
//           } else {
//             return (
//               <li key={key} className="breadcrumb-item">
//                 <Link to={found.path}>{found.name}</Link>
//               </li>
//             );
//           }
//         });
//         setBreadcrumbs(crumbArray);
//       } catch (error) {
//         if (error.name === "AbortError") {
//           console.log("loadBreadcrumbs Aborted");
//         } else {
//           throw error;
//         }
//       }
//     }
//     loadBreadcrumbs();
//     return () => abortController.abort();
//   }, [deckId, cardId, crumbs]);
//   return <ol className="breadcrumb">{breadcrumbs}</ol>;
// };

// export default Breadcrumb;
