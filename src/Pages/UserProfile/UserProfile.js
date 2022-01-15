import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "./UserProfile.module.css";
import { getUserPhotos, getUserLiked } from "../../Redux/Actions";
import ImageList from "../../components/Images/ImageList";
import { connect } from "react-redux";
import Toolbar from "../../components/Toolbar/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Backdrap from "../../components/Backdrap/Backdrap";
const UserProfile = (props) => {
  const [SideDrawerOpen, setSideDrawerOpen] = useState(false);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(true);
  };

  const BackDropDisplay = () => {
    if (SideDrawerOpen === true) {
      return (
        <div onClick={() => setSideDrawerOpen(false)}>
          <Backdrap />
        </div>
      );
    }
  };
  const userInfo = useLocation().state;
  console.log(userInfo);
  useEffect(() => {
    console.log("getting new photos");
    props.getUserPhotos(userInfo.username);
    props.getUserLiked(userInfo.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo.username]);
  const [showLiked, setShowLiked] = useState(false);
  const [activeLink, setActiveLink] = useState("photos");

  return (
    <div>
      <Toolbar toggler={drawerToggleClickHandler} />
      {BackDropDisplay()}
      <SideDrawer
        closeSideDraw={() => setSideDrawerOpen(false)}
        show={SideDrawerOpen}
      />
      <div className="mt-20">
        <div>
          <div className="flex justify-center my-8 mb-10 p-4 items-top">
            <div className=" flex-end ">
              <img
                className=" w-32 rounded-full"
                src={userInfo.profile_image}
                alt="profile"
              />
            </div>
            <div className=" w-80 px-6">
              <h1 className="text-2xl font-bold ">{userInfo.username}</h1>
              <div className={classes.dec}>{userInfo.bio}</div>
            </div>
          </div>
        </div>
        <div className={classes.stickyState}>
          <div className={classes.hr}>
            <nav className={classes.nav}>
              <ul className="flex justify-center items-center">
                <li
                  onClick={() => {
                    setActiveLink("photos");
                    setShowLiked(false);
                  }}
                  className={`ml-7 ${
                    activeLink === "photos" ? classes.active : ""
                  } cursor-pointer py-3`}
                >
                  <i className=" fas fa-image"></i>
                  <span className="ml-2 mr-1">Photos</span>
                  <span className="font-light">{userInfo.photos}</span>
                </li>
                <li
                  onClick={() => {
                    setActiveLink("liked");
                    setShowLiked(true);
                  }}
                  className={`ml-10 py-3 cursor-pointer ${
                    activeLink === "liked" ? classes.active : ""
                  }`}
                >
                  <i className="fas fa-heart"></i>
                  <span className="ml-2 mr-1">Likes</span>
                  <span className="font-light">{userInfo.likes}</span>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <main className="my-5 mx-2 xl:mx-10">
          {showLiked ? (
            <ImageList images={props.liked || []} />
          ) : (
            <ImageList images={props.images || []} />
          )}
        </main>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    images: state.UnsplashReducer.individualPhotos,
    liked: state.UnsplashReducer.liked,
  };
};
export default connect(mapStateToProps, { getUserPhotos, getUserLiked })(
  UserProfile
);
