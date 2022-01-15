import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Toolbar.css";
import useModal from '../../HOC/useModal'
import Customize from "../Customize/Customize";
import SearchBar from "../SearchBar/SearchBar"
const Toolbar = (props) => {

  const [Modal,open,close] = useModal('root');

  return (
    <header  className="Toolbar">
      <Modal>
        <Customize close={close}/>
      </Modal>
      <nav className="Toolbar_Navigation">
        <div  className="mobile">
          <div className="Toolbar_Logo">
            <Link to="/">
              <span className="text-base ">Erfanezk</span>
            </Link>
          </div>
          <div className="togglerContainer">
            <button
              onClick={props.toggler}
              className="w-6   focus:outline-none flex flex-col"
            >
              <span className={`toggler togglerFirstChild bg-black`}></span>
              <span className={`toggler bg-black`}></span>
              <span className={`toggler togglerLastChild bg-black`}></span>
            </button>
          </div>
        </div>
        <div className="spacer">
          <SearchBar/>
        </div>
        <div className="Toolbar_Navigation_Item">
          <ul >
            <li>
              <NavLink to="/" active="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li onClick={open}>
              <span className="customize">Customize</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default Toolbar;
