import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import history from "../../history";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../Redux/Actions/auth";
import {
  downloadProduct,
  getUserInfo,
  updateUserInfo,
} from "./../../Redux/Actions/index";
import FileSaver from "file-saver";
export default function UserPanel(props) {
  const [fields, onFiledsChnage] = useState({
    email: "",
    name: "",
  });

  const [product, setProduct] = useState([]);
  const [showCp, setShowCp] = useState(0);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const id = props.match.params.id;
  function download(source) {
    const fileName = source.split("/").pop();
    var el = document.createElement("a");
    el.setAttribute("href", source);
    el.setAttribute("download", fileName);
    document.body.appendChild(el);
    el.click();
    el.remove();
  }
  useEffect(() => {
    (async () => {
      const result = await dispatch(getUserInfo(id));
      console.log(result.data.user);
      setProduct(result.data.products);
      onFiledsChnage({
        email: result.data.user.email,
        name: result.data.user.name,
      });
    })();
  }, []);

  function validateForm() {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(fields.email?.toLowerCase())) {
      //setError('ایمیل اشتباه است')
      return false;
    }

    if (!fields.name) {
      // setError('اسم را پر کنید')
      return false;
    }
    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    await dispatch(updateUserInfo(id, fields.name, fields.email));
    console.log("dd");
    setError("با موفقیت اپدیت شد");
  }
  async function downloadImage(imageSrc) {
    FileSaver.saveAs(imageSrc, "image.jpg");
  }

  let cp = null;
  if (showCp == 0)
    cp = (
      <Form onSubmit={handleSubmit}>
        <div className="my-5">
          <h4>مشخصات</h4>
        </div>
        <Form.Group controlId="email" size="lg">
          <Form.Label>اسم</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.name}
            onChange={(e) => {
              onFiledsChnage({
                ...fields,
                name: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={(e) => {
              onFiledsChnage({
                ...fields,
                email: e.target.value,
              });
            }}
          />
        </Form.Group>
        <div className="mt-4">
          <Button block size="md" type="submit" disabled={!validateForm()}>
            برروزرسانی
          </Button>
        </div>
        <div>{error}</div>
      </Form>
    );
  else
    cp = product.map((p) => (
      <div key={p.id}>
        <div id="erfan" className="productTopRight">
          <div className="productInfoTop">
            <img src={p.thumbnail_url} alt="" className="productInfoImg" />
            <a download target="_blank" href={p.source_url}>
              دانلود عکس{" "}
            </a>
      
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">موضوع:</span>
              <span className="productInfoValue">{p.title}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">ایدی:</span>
              <span className="productInfoValue">{p.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">هزینه:</span>
              <span className="productInfoValue">{p.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">دسته بندی:</span>
              <span className="productInfoValue">{p.category?.title}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  function renderForm() {
    return (
      <div>
        <div className="text-center">
          <span onClick={() => setShowCp(1)} style={{ marginLeft: "20px" }}>
            لیست خرید ها
          </span>
          <span onClick={() => setShowCp(0)} style={{ marginRight: "20px" }}>
            مشخصات
          </span>
        </div>
        {cp}
      </div>
    );
  }

  return <div className="Signup">{renderForm()}</div>;
}
