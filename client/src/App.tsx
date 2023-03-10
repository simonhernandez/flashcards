import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault(); // this stops the browser from refreshing and losing data on form submit

    const response = await fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deck = await response.json();
    setDecks([...decks, deck])
    setTitle("");
  };

  const handleDeleteDeck = async (deckId: string) => {
    await fetch(`http://localhost:5000/decks/${deckId}`, {
      method: "DELETE",
    });

    setDecks(decks.filter((deck) => deck._id !== deckId))
  };

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks"); // fetch returns an object that has a .json method that returns the array of objects
      const newDecks = await response.json();
      setDecks(newDecks);
    }

    fetchDecks();
  }, []);

  return (
    <div className="App">
      <ul className="decks">
        {decks.map((deck) => {
          return (
            <li key={deck._id}>
              {deck.title}
              <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
            </li>
          );
        })}
      </ul>

      <form action="" onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          type="text"
          id="deck-title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <button>Create Deck</button>
      </form>
    </div>
  );
}

export default App;
