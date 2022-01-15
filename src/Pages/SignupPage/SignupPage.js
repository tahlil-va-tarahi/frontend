import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import history from "../../history";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {  signUpUser } from "../../Redux/Actions/auth";

export default function SignupPage() {
  const [fields, onFiledsChnage] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    name:''
  });

  const dispatch = useDispatch();
  const [error, setError] = useState('');



  function validateForm() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(fields.password)
    if (!re.test((fields.email?.toLowerCase()))) {
      return false;
    }

    if (fields.password.length < 6) return false;

    if (fields.password !== fields.password_confirmation) return false;

    return true;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch(signUpUser(fields));
      setError('قبت نام با موفقیت انجام شد ورود کنید')
    } catch (error) {
      setError(error)
    }
  }

  function renderForm() {
    return (
      <Form onSubmit={handleSubmit}>
        <div className="my-5">
          <h4>ثبت نام در سایت زمرد شاپ</h4>
        </div>
        <Form.Group controlId="email" size="lg">
          <Form.Label>اسم</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={fields.name}
            onChange={(e)=>{
              onFiledsChnage({
                ...fields,
                name:e.target.value
              })
            }}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Label>ایمیل</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={(e)=>{
              onFiledsChnage({
                ...fields,
                email:e.target.value
              })
            }}
          />
        </Form.Group>
  
        <Form.Group controlId="password" size="lg">
          <Form.Label>رمز عبور</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={(e)=>{
              onFiledsChnage({
                ...fields,
                password:e.target.value
              })
            }}
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword" size="lg">
          <Form.Label>تکرار رمز عبور</Form.Label>
          <Form.Control
            type="password"
            onChange={(e)=>{
              onFiledsChnage({
                ...fields,
                password_confirmation:e.target.value
              })
            }}
            value={fields.password_confirmation}
          />
        </Form.Group>
        <div className="mt-4">
          <Button block size="md" type="submit" disabled={!validateForm()}>
          ثبت نام
          </Button>
        </div>
        <div>
          {error}
        </div>
        <div className="text-sm  mt-2">
          <Link to="/login">اکانت دارم/ورود</Link>
        </div>
      </Form>
    );
  }

  return <div className="Signup">{renderForm()}</div>;
}
