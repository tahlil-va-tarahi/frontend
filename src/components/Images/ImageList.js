import React, { useRef, useState } from "react";
import "./ImageList.css";
import ImageCard from "./ImageCard/Image-Card";
import useModal from "../../HOC/useModal";
import ModalContent from "../Modals/simpleModal/ModalContent";
const ImageList = (props) => {
  const [Modal, open, close] = useModal("root", {
    preventScroll: false,
  });
  const imageListRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const images = props.images.map((img) => {
    return (
      <ImageCard setSelectedImage={setSelectedImage} open={open} key={img.id} img={img} />
    );
  });


  const modal = selectedImage ? (
    <Modal>
      <ModalContent
        close={() => {
          close();
        }}
        item={selectedImage}
      />
    </Modal>
  ) : null;

  return (
    <div ref={imageListRef} className="Images-List">
      {images}
      {modal}
    </div>
  );
};

export default ImageList;
