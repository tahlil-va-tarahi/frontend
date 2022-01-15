import "./newProduct.css";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../Redux/Actions/admin";
export default function NewProduct() {
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    image: "",
    description: "",
    price: 0,
    title: "",
    category_id: 1,
  });

  const dispatch = useDispatch();
  console.log(formValues);

  const onChangeImage = (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    if (file) {
      setFormValues({
        ...formValues,
        image: file,
      })
    }

    // reader.onload=(e)=>{
    //     console.log("image data",e.target.result)
    //     setRoom({ ...room, image: e.target.result });
    // }
    // setRoom({ ...room, image: file})
};
  const onSubmit = (e) => {
    setError('')
    e.preventDefault();
    if (
      !(
        formValues.image &&
        formValues.description &&
        formValues.price &&
        formValues.title
      )
    ) {
      setError("فرم را پر کنید");
      return;
    }

    if (!(formValues.price < 999999999 && formValues.price  > 20000)) {
      setError(" هزینه باید بیشتر از بیست هزار تومن و کمتر از صد میلیون باشد");
      return;
    }

    dispatch(addProduct(formValues));
    setError('با موفقیت اضاف شد')
  };
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form onSubmit={onSubmit} className="addProductForm">
        <div style={{ color: "red" }} className="my-4 text-sm">
          {error}
        </div>
        <div className="addProductItem">
          <label>عکس</label>
          <input
            onChange={onChangeImage}
            type="file"
            id="file"
          />
        </div>
        <div className="addProductItem">
          <label>تیتر</label>
          <input
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
            onChange={(e) =>
              setFormValues({
                ...formValues,
                category_id: e.target.value,
              })
            }
            name="active"
            id="active"
          >
            <option selected value="1">
              طبیعت
            </option>
            <option value="2">تکنولوژی</option>
            <option value="3">انتزاعی</option>
          </select>
        </div>
        <button className="addProductButton">اضافه کردن محصول</button>
      </form>
    </div>
  );
}
