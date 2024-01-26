import React from "react";
import { Switch, Route } from "react-router-dom";
import AddCard from "../components/AddCard";
import Breadcrumb from "./Breadcrumb";
import CreateDeck from "../components/CreateDeck";
import Deck from "../components/Deck";
import DeckList from "../components/DeckList";
import EditCard from "../components/EditCard";
import EditDeck from "../components/EditDeck";
import Header from "./Header";
import NotFound from "./NotFound";
import Study from "../components/Study";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <Breadcrumb crumbs={["Home", "Create Deck"]} />
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <NotFound />
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
