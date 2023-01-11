import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");

  const handleCreateDeck = async (e: React.FormEvent) => {
    e.preventDefault(); // this stops the browser from refreshing and losing data on form submit

    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle('');
  }

  return (
    <div className="App">
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
