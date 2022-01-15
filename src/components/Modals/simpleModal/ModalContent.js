import React from "react";
import classes from "./Modal.module.css";
import DateDiff from "date-diff";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
function imageOrientation(src) {
  let orientation,
    img = new Image();
  img.src = src;

  if (img.naturalWidth > img.naturalHeight) {
    orientation = "landscape";
  } else if (img.naturalWidth < img.naturalHeight) {
    orientation = "portrait";
  } else {
    orientation = "even";
  }

  return orientation;
}
const Modal = (props) => {
  // let stateOfPublished = "moment ago";
  // let stateOfUpdate = "moment ago";
  // const publishedDiff = new DateDiff(
  //   new Date(),
  //   new Date(props.item.created_at)
  // );
  // const updateDiff = new DateDiff(new Date(), new Date(props.item.updated_at));

  // if (updateDiff.years() >= 1)
  //   stateOfUpdate = `${Math.floor(updateDiff.years())} year${
  //     Math.floor(updateDiff.years()) > 1 ? "s" : ""
  //   } ago`;
  // else if (updateDiff.months() >= 1)
  //   stateOfUpdate = `${updateDiff.months()} month${
  //     updateDiff.months() > 1 ? "s" : ""
  //   } ago`;
  // else if (updateDiff.days() >= 1)
  //   stateOfUpdate = `${updateDiff.days()} day${
  //     updateDiff.days() > 1 ? "s" : ""
  //   } ago`;

  // if (publishedDiff.years() >= 1)
  //   stateOfPublished = `${Math.floor(publishedDiff.years())} year${
  //     Math.floor(publishedDiff.years()) > 1 ? "s" : ""
  //   } ago`;
  // else if (publishedDiff.months() >= 1)
  //   stateOfPublished = `${Math.floor(publishedDiff.months())} month${
  //     publishedDiff.months() > 1 ? "s" : ""
  //   } ago`;

  const typeOfImage = imageOrientation(props.item.thumbnail_url);
  return (
    <div
      className={`left-0 ${
        typeOfImage === "landscape" ? "lg:w-auto" : "lg:w-3/4"
      } ${
        classes.modalBody
      } overflow-x-hidden  lg:left-1/2 transform lg:mt-6 lg:-translate-x-1/2 top-0 fixed z-50 w-full    bg-white`}
    >
      <div>
        <header
          className={`px-5 lg:px-10 pt-4 pb-0 sticky ${classes.header}  top-0`}
        >
          <div className="flex justify-between items-center">
            <div className="text-lg">
              <i
                onClick={props.close}
                className="far text-xl cursor-pointer fa-times-circle"
              ></i>
            </div>
          </div>
  hhhhhhhhhhhhhhhhhhhhhhhhhhhhh
        </header>
        <div className={`${classes.imgC}`}>
          <img
            src={props.item.thumbnail_url}
            className={`${classes.img} ${
              typeOfImage === "landscape" ? "" : "w-96 mx-auto"
            }`}
            alt={props.item.alt_description}
          />
        </div>
        <div className="lg:px-10">
          <div className="p-5">
            <span className="font-bold">نام محصول:</span>{" "}
            <span itemProps="description">{props.item.title}</span>
          </div>
          <div className="px-5">
            <span>توضیحات:</span>
            {props.item.description}
          </div>
          <div className="px-5">
            <span>قیمت:</span>
            {props.item.price}
          </div>
          
          <div className={classes.dec}>
            {/* <span className="capitalize text-sm mr-2">updated </span>
            {stateOfUpdate}
            <div>
              <span itemProps="dataPublished" className="text-sm mr-2">published</span>
              <span className="text-base">{stateOfPublished}</span>
            </div> */}
          </div>
          <div className="p-5 text-center">
            <Button >خرید</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
