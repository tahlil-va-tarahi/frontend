import React from 'react'
import Title from '../Title/Title'
import Toolbar from '../HomeToolbar/HomeToolbar'
import classes from './Header.module.css'
import { connect } from 'react-redux';
import image from '../../../assets/alex-glebov-uiTEV1jvlGc-unsplash.jpg'
const Header = (props) => {
   const img = props.backgroundImage ? props.backgroundImage : image
   const style={
      backgroundImage: `
      url(${img})`
   }
    return (
       <header style={style} className={classes.header}>
          {/* <div>
             <Title />
          </div> */}
            <Toolbar toggler={props.SideDrawerToggler}/>
       </header>
    )
}
const mapStateToProps = state=>{
   return {
      backgroundImage:state.UiReducer.backgrundImage
   }
}
export default connect(mapStateToProps,null)(Header)
