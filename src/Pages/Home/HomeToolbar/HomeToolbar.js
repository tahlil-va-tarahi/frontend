import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import anime from "animejs";
import classes from "./HomeToolbar.module.css";
import useModal from "../../../HOC/useModal";
import { useSelector } from "react-redux";
import Customize from "../../../components/Customize/Customize";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { logUserOut } from "../../../Redux/Actions/auth";
const Toolbar = (props) => {
  const [headerStyle, setHeaderStyle] = useState({
    transition: "all 200ms ease-in",
  });

  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [Modal, open, close] = useModal("root");
  const navItems = useRef();
  const mobileNav = useRef();
  const hoomeToolbarRef = useRef();
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  const userId = JSON.parse(localStorage.getItem('id'))
  useEffect(() => {
    anime({
      targets: navItems.current,
      translateX: [400, 0],
      delay: 1000,
      duration: 600,
    });
    anime({
      targets: mobileNav.current,
      translateY: [-200, 0],
      delay: 1000,
      duration: 1000,
    });
    props.defineToolbar(hoomeToolbarRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useScrollPosition(
    ({ prevPos, currPos }) => {
      setIsVisible(currPos.y < -150);

      const shouldBeStyle = {
        transition: `all 200ms ${isVisible ? "ease-in" : "ease-out"}`,
        backgroundColor: isVisible ? "white" : "transparent",
        color: isVisible ? "black" : "white",
        boxShadow: isVisible ? "1px 1px 8px #282133" : "",
      };
      setHeaderStyle(shouldBeStyle);
    },
    [headerStyle]
  );
  return (
    <header
      ref={hoomeToolbarRef}
      style={headerStyle}
      className={classes.Toolbar}
    >
      <Modal>
        <Customize close={close} />
      </Modal>
      <nav className={classes.Toolbar_Navigation}>
        <div ref={mobileNav} className={classes.mobile}>
          <div className={classes.Toolbar_Logo}>
            <Link to="/">
              <span className="text-base">زمرد</span>
            </Link>
          </div>
          <div className={classes.togglerContainer}>
            <button
              onClick={props.toggler}
              className="w-6   focus:outline-none flex flex-col"
            >
              <span
                className={`${classes.toggler} ${classes.togglerFirstChild} ${
                  isVisible ? "bg-black" : "bg-white"
                } `}
              ></span>
              <span
                className={`${classes.toggler} ${
                  isVisible ? "bg-black" : "bg-white"
                }  `}
              ></span>
              <span
                className={`${classes.toggler} ${classes.togglerLastChild} ${
                  isVisible ? "bg-black" : "bg-white"
                } `}
              ></span>
            </button>
          </div>
        </div>
        <div className={classes.spacer}></div>
        <div className={classes.Toolbar_Navigation_Item}>
          <ul ref={navItems}>
            <li>
              <NavLink to="/" active={classes.active}>
                صفحه اصلی
              </NavLink>
            </li>
            {isAdmin ? (
              <li>
                <i className="fa ml-3 mr-2 fa-users"></i>
                <NavLink to="/admin">ادمین</NavLink>
              </li>
            ) :  <li>
            <i className="fa ml-3 mr-2 fa-users"></i>
            <NavLink to={`/user/${userId}`}>پنل کاربری</NavLink>
          </li>}
            <li>
              <button
                onClick={() => {
                  dispatch(logUserOut());
                }}
                className="font-thin bg-transparent border-0"
                to="/users"
              >
                خروج
              </button>
            </li>
            {/* <li onClick={open}>
              <span className={classes.customize}>شخصی سازی</span>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    defineToolbar: (ref) =>
      dispatch({
        type: "HOME_TOOLBAR",
        payload: ref,
      }),
  };
};
export default connect(null, mapDispatchToProps)(Toolbar);
