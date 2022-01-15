import React, { useEffect, useState } from 'react';
import SideDrawer from '../../components/SideDrawer/SideDrawer';
import Backdrap from '../../components/Backdrap/Backdrap';
import ImageList from '../../components/Images/ImageList'
import { connect } from 'react-redux'
import {getAllImages} from '../../Redux/Actions'
import Header from './Header/Header'
import Collections from '../../components/Collections/Collections';

const Home = (props) => {

    const [SideDrawerOpen, setSideDrawerOpen] = useState(false);


   useEffect(() => {
    props.getAllImages(props.classification)
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[props.classification]);


    const drawerToggleClickHandler = () => {
        setSideDrawerOpen(true);
    };


    const BackDropDisplay = () => {
        if (SideDrawerOpen === true) {
            return (
                <div onClick={() => setSideDrawerOpen(false)}>
                    <Backdrap />
                </div>
            )
        }
    }

  

    return (
        <div >
            <Header SideDrawerToggler={drawerToggleClickHandler}/>
            <SideDrawer closeSideDraw={()=>setSideDrawerOpen(false)} show={SideDrawerOpen} />
          
            <Collections/>
            <main className="mx-2 md:mx-10 xl:mx-10">
            <ImageList images={props.UnsplashReducer || []} />
            {BackDropDisplay()}

            </main>

        </div>
    );
}

const mapStateToProps = (state) => {
   
  return{
    UnsplashReducer : state.UnsplashReducer.Unsplash,
    classification:state.classificationName.term
  }
}
export default connect(mapStateToProps,{getAllImages})(Home);
