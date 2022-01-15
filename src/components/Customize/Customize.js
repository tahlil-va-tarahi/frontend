import React, { useState,useEffect } from "react";
import { connect } from "react-redux";
import { changeHomeImage, addImage } from "../../Redux/Actions";
import Bg from "./Bg/Bg";
const Customize = (props) => {
  const [image, setImage] = useState(null);
  const backgrounds = props.images.map((item, i) => (
    <Bg key={Date() + i} imageSrc={item} />
  ));
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = e.target.files[0];
      setImage(URL.createObjectURL(newImage));
    }
  };
  useEffect(() => {
    if (image) {
      props.addImage(image);
      setImage(null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image])

  return (
    <div
      className={`left-0 lg:w-1/2 p-4 top-1/2 lg:left-1/2 transform lg:top-1/2 lg:mt-6 lg:-translate-x-1/2 -translate-y-1/2  fixed z-50 w-full bg-white`}
      onClick={(e) => {
        if (e.target.nodeName === "IMG") props.close();
      }}
    >
      <article>
        <div>
          <header className="flex bg-green py-3 my-1">
            <div style={{ flexBasis: "150px" }}></div>
            <div className="flex-1">Customize this page</div>
          </header>
          <div className="flex mt-3 overflow-hidden">
            <div style={{ flexBasis: "150px" }} className="">
              <ul className="flex flex-col">
                <li className="capitalize cursor-pointer mb-3">
                  <i className="fas mr-3 fa-image"></i>background
                </li>
                <li className="capitalize cursor-pointer mb-3">
                  <i className="fas mr-3 fa-location-arrow"></i>shortcutes
                </li>
                <li className="capitalize cursor-pointer mb-3">
                  <i className="fas mr-3 fa-fill-drip"></i>color and theme
                </li>
              </ul>
            </div>
            <div
              style={{ height: "372px" }}
              className="lg:grid overflow-y-auto lg:gap-x-2 lg:gap-y-5 flex-1  flex flex-col lg:grid-cols-3"
            >
              <div className="p-2 w-full h-full bg-black flex justify-center items-center">
                <input
                  className=""
                  style={{ color: "white" }}
                  type="file"
                  id="img"
                  name="uploadImage"
                  onChange={onImageChange}
                />
              </div>
              {backgrounds}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    images: state.UiReducer.images,
  };
};

export default connect(mapStateToProps, { addImage, changeHomeImage })(
  Customize
);
