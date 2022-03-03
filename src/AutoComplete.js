import React, { useState, useEffect, useRef } from "react";

const AutoComplete = () => {
  const [states, setstates] = useState([]);
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const [list, setList] = useState([]);

  const myRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/state")
      .then((res) => res.json())
      .then((data) => {
        setstates(data);
      });
  }, []);

  const changeHandler = (text) => {
    let matches = [];
    if (text.length >= 3) {
      matches = states.filter((state) => {
        const regex = new RegExp(`${text}`, "gi");
        let a = state.name.match(regex);
        return a;
      });
    }
    setSuggestion(matches);
    setText(text);
  };

  const ListData = (data) => {
    setList([...list, data]);
  };

  useEffect(() => {
    const node = myRef.current;
    console.log(node, "node");
    node.addEventListener("keydown", (e) => {
      console.log(e, "event");
      const active = document.activeElement;
      if (e.keyCode === 40 && active.nextSibling) {
        active.nextSibling.focus();
      }
      if (e.keyCode === 38 && active.previousSibling) {
        active.previousSibling.focus();
      }
      
    });
  }, []);

  return (
    <>
      <div className="Container">
        <h1> AutoComplete Component </h1>
        <input
          type="text"
          placeholder="Search for a State ...."
          onChange={(e) => changeHandler(e.target.value)}
          value={text}
        />
        <div ref={myRef}>
          {suggestion.slice(0, 5).map((sugg) => {
            return (
              <div
                key={sugg.id}
                className="suggestion"
                tabIndex="0"
                onClick={() => {
                  ListData(sugg);
                }}
              >
                {sugg.name}
              </div>
            );
          })}
        </div>
      </div>
      <h3> Selected States</h3>
      {list.map((li, index) => {
        return (
          <div key={index} className="list">
            <p> {li.name} </p>
          </div>
        );
      })}
    </>
  );
};

export default AutoComplete;
