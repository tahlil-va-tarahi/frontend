import { Link } from "react-router-dom";
import "./product.css";
// import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProductInfo, updateProduct } from "../../Redux/Actions/admin";
export default function Product(props) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const id = props.match.params.id;
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    description: '',
    price: '',
    title: '',
    category_id: 1,
  });
  const onSubmit = (e) => {
    setError("")
    e.preventDefault();
    if (
      !(
        formValues.description ||
        formValues.price ||
        formValues.title
      )
    ) {
      setError("حداقل یک فیلد را رعایت کنید");
      return;
    }
    if (formValues.title.length < 3) {
      setError(" نام محصول باید بیشتر از سه حرف باشد");
      return;
    }
    if (formValues.price > 999999999) {
      setError("هزینه باید کمتر از 100 میلیون باشد");
      return;
    }

    dispatch(updateProduct(product.id, formValues));
    setError("با موفقیت اپدیت شد")
  };
  let category_id = null;
  if (product.category_id === 1) {
    category_id = "طبیعت";
  } else if (product.category_id === 2) category_id = "تکنولوژی";
  else if (product.category_id === 3) category_id = "انتزاعی";

  useEffect(() => {
    (async () => {
      const result = await dispatch(getProductInfo(id));
      setProduct(result.product);
    })();
  }, []);
  console.log(product.image)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">محصول</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.thumbnail_url} alt="" className="productInfoImg" />
          </div>
          <div className="productInfoBottom">
          <div className="productInfoItem">
              <span className="productInfoKey">موضوع:</span>
              <span className="productInfoValue">{product.title}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">ایدی:</span>
              <span className="productInfoValue">{product.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">هزینه:</span>
              <span className="productInfoValue">{product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">دسته بندی:</span>
              <span className="productInfoValue">{product.category?.title}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form onSubmit={onSubmit} className="productForm">
          <div className="productFormLeft">
            <div className="addProductItem">
              <label>تیتر</label>
              <input
                value={formValues.title}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    title: e.target.value,
                  })
                }
                type="text"
              />
            </div>
            <div className="addProductItem">
              <label>توضیحات</label>
              <input
                value={formValues.description}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    description: e.target.value,
                  })
                }
                type="text"
              />
            </div>
            <div className="addProductItem">
              <label>هزینه</label>
              <input
                value={formValues.price}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    price: e.target.value,
                  })
                }
                type="number"
              />
            </div>
            <div className="addProductItem">
              <label>دسته بندی</label>
              <select
                selected={product.category_id}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    category_id: e.target.value,
                  })
                }
                name="active"
                id="active"
              >
                <option value="1">طبیعت</option>
                <option value="2">تکنولوژی</option>
                <option value="3">انتزاعی</option>
              </select>
            </div>
          </div>
          <div className="productFormRight">
            {error}
            <button className="productButton">اپدیت کردن محصول</button>
          </div>
        </form>
      </div>
    </div>
  );
}
