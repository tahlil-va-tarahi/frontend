import React, { useEffect, useState } from "react";
import Backdrop from "../../components/Backdrap/Backdrap";
import Toolbar from "../../components/Toolbar/Toolbar";
import ImageList from "../../components/Images/ImageList";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner";
import {publicBackend} from "../../api/";
const SearchImage = (props) => {
  const [SideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [images, setImages] = useState([]);
  const searchedValue = props.match.params.name;

  useEffect(() => {
    (async () => {
      const images = await publicBackend.get(
        `/search/photos?query=${searchedValue}&per_page=${20}`
      );
      setImages([...images.data.results]);
    })();
  }, [searchedValue]);
  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(true);
  };

  const BackDropDisplay = () => {
    if (SideDrawerOpen === true) {
      return (
        <div onClick={() => setSideDrawerOpen(false)}>
          <Backdrop />
        </div>
      );
    }
  };
  let show = <ImageList images={images} />;
  if (images.length === 0)
  {
    show = <Spinner />;
  }
  return (
    <div>
      <div>
        <Toolbar toggler={drawerToggleClickHandler} />
        <SideDrawer
          closeSideDraw={() => setSideDrawerOpen(false)}
          show={SideDrawerOpen}
        />

        <main className="mx-2 md:mx-10 xl:mx-10 my-20">
          <h1 className="text-4xl  inline-block mt-8  font-extrabold">
            {searchedValue}
          </h1>
          {show}
          {BackDropDisplay()}
        </main>
      </div>
    </div>
  );
};

export default connect(null, null)(SearchImage);
