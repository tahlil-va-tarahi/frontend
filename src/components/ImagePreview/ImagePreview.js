import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductInfo } from "../../Redux/Actions/admin";
import { Button } from "react-bootstrap";
import { buyProduct } from "../../Redux/Actions";
import history from '../../history'
const ImagePreview = (props) => {
  const [product, setProduct] = useState({});
  const id = props.match.params.id;
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const result = await dispatch(getProductInfo(id));
      console.log("result", result);
      setProduct(result.product);
    })();
  }, []);
  return (
    <div class="container">
      <div class="card">
        <div class="container-fliud">
          <div class="wrapper row">
            <div class="preview col-md-6">
              <div class="preview-pic tab-content">
                <div class="tab-pane active" id="pic-1">
                  <img src={product.thumbnail_url} alt="f" />
                </div>
              </div>
            </div>
            <div class="details col-md-6">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'space-between'}}>
                <h3 class="product-title">{product.title}</h3>
                <div onClick={()=>{
                  history.push("/")
                }} style={{cursor:'pointer'}}>برگشت به صفحه اصلی</div>
              </div>

              <div class="rating">
                <div class="stars">
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star checked"></span>
                  <span class="fa fa-star"></span>
                  <span class="fa fa-star"></span>
                </div>
              </div>
              <p class="product-description">{product.description}</p>
              <h4 class="price">
                قیمت محصول <span>{product.price} ریال</span>
              </h4>

              <div class="action">
                <Button
                  onClick={() => {
                    dispatch(buyProduct(id));
                  }}
                >
                  خرید
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
