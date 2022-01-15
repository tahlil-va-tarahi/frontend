import React from "react";
import classes from "./imageCard.module.css";
import {Link} from 'react-router-dom';
import history from "../../../history";
function handleIntersection(entries) {
  // eslint-disable-next-line array-callback-return
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("lazyload");
      entry.target.classList.add("loaded");
    }
  });
}

class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      observer: new IntersectionObserver(handleIntersection, {
        threshold: 0.9,
      }),
    };
    this.imageRef = React.createRef();
    this.download = React.createRef();
  }

  componentDidMount() {
    this.state.observer.observe(this.imageRef.current);
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  componentWillUnmount() {
    this.state.observer.unobserve(this.imageRef.current);
  }
  animateImg = () => {
    this.imageRef.current.classList.add(classes.move);
  };
  render() {
    return (
      <div  itemScope itemType="https://schema.org/ImageObject" className={classes.imageCardContainer}>
        <img
          className="lazyload mb-0 block"
          ref={this.imageRef}
          alt=""
          src={this.props.img.thumbnail_url}
          itemType="image"
        />
        <div onClick={()=>history.push("/image/"+this.props.img.id)} className={classes.overlay}>

        </div>
        <div className={classes.icons}>
          <i className="fa fa-heart"></i>
          <i className="fas fa-plus"></i>
        </div>
        <div className={classes.download}>
        <div> <i className="fa fa-download" aria-hidden="true"></i></div>

        </div>
        {/* <div className={classes.info}>
          <Link className="flex items-center" to={{
              pathname:`/user-profile/${this.props.img.user.username}`,
              state:{
                username:this.props.img.user.username,
                bio:this.props.img.user.bio,
                location:this.props.img.user.location,
                photos:this.props.img.user.total_photos,
                likes:this.props.img.user.total_likes,
                profile_image:this.props.img.user.profile_image.large || this.props.img.user.profile_image.medium | this.props.img.user.profile_image.small
              }
              
            }}>
            <img alt="profile" className="rounded-full mr-3" src={this.props.img.user.profile_image.small}/> 
             <div>
              {this.props.img.user.username}
            </div>
          </Link>
        </div> */}
      </div>
    );
  }
}
export default ImageCard;
