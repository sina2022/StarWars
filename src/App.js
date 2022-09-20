import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/ui/Header";
import CharacterGrid from "./components/characters/CharacterGrid";
import Search from "./components/ui/Search";
import "./App.css";

const App = () => {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [url, setUrl] = useState("https://swapi.dev/api/people/");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const result = await axios(`${url}${query}`);

      console.log(result.data);

      setItems(result.data.results);
      setData(result.data);
      setIsLoading(false);
    };

    fetchItems();
  }, [url, query]);

  const queryFunction = (q) => {
    if (q === "") {
      setQuery(q);
    } else {
      setQuery("?search=" + q);
    }
  };

  const nextHandler = () => {
    setUrl(data.next);
  };

  const previusHandler = () => {
    setUrl(data.previous);
  };

  return (
    <div className="container">
      <Header />
      <Search getQuery={queryFunction} />
      <CharacterGrid isLoading={isLoading} items={items} />
      {data.next && <button onClick={nextHandler}>next</button>}
      {data.previous && <button onClick={previusHandler}>previous</button>}
    </div>
  );
};

export default App;
