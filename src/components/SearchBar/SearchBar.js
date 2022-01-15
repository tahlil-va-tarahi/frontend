import React, { useRef } from "react";
import classes from "./SearchBar.module.css";
import history from "../../history";
import Suggest from "./Suggest/Suggest";
import useLocalStorage from "./../../HOC/useLocalStorage";
import _ from "lodash";

const SearchBar = () => {
  const selectRef = useRef();
  const searchRef = useRef();
  const [items, setItems] = useLocalStorage("searchHistory", []);
  const submitForm = (e, value) => {
    e.preventDefault();
    items.push(value);
    setItems([...items]);
    history.push("/search/" + value);
  };

  return (
    <div>
      <form
        onSubmit={(e) => submitForm(e, searchRef.current.value)}
        className={classes.searchContainer}
      >
        <i className="fas fa-search"></i>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search free high-resolution photos"
          onFocus={() => {
            if (items.length <= 0) return;
      
            selectRef.current.classList.remove(classes.none);
            selectRef.current.classList.add(classes.suggestions);
          }}
        />
        <div ref={selectRef} className={classes.none}>
          <i
            onClick={() => {
              selectRef.current.classList.add(classes.none);
              selectRef.current.classList.remove(classes.suggestions);
            }}
            className="fas fa-times"
          ></i>
          <div>
            <h3 className={classes.header}>
              {items.length >= 1 ? "Recently" : ""}
            </h3>
            <ul className={classes.items}>
              {items.map((item) => (
                <li key={item}>
                  <Suggest
                    click={() => {
                      _.remove(items, (eachItem) => {
                        return eachItem === item;
                      });
                      setItems([...items]);
                    }}
                    close={true}
                    title={item}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
