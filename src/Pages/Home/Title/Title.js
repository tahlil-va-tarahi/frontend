import React, { useRef, useEffect } from "react";
import anime from "animejs";
import SearchBar from "../../../components/SearchBar/SearchBar";
const Title = () => {
  const divRef = useRef();
  useEffect(() => {
    anime({
      targets: divRef.current,
      translateX: [-200, '-50%'],
      translateY:['-50%','-50%'],
      opacity: [0, 1],
      delay: 1500,
      duration: 1200,
    });
  }, []);

  return (
    <div className="title" ref={divRef}>
        <h1 className=" capitalize p-2 mb-5 font-bold flex justify-center items-center  transform skew-x-12 lg:text-2xl">
            <div>
            Find your <span className="transform scale-50 ">perfect</span> image
            </div>



        </h1>
        <SearchBar />
     
    </div>
  );
};

export default Title;
