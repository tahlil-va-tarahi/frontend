import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/Actions/auth";
import history from "../../history";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  async function handleSubmit(event) {
   event.preventDefault();

    try {
      await dispatch(loginUser({
        email,
        password
      }));

      history.push('/');
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className="Login">
      <div>
        <Form onSubmit={handleSubmit}>
          <div className="my-5">
            <h4>ورود به سایت زمرد شاپ</h4>
          </div>
          <div className="my-2">
            <Form.Group size="lg" controlId="email">
              <Form.Label>ایمیل</Form.Label>
              <Form.Control
                autoFocus
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </div>

          <Form.Group size="lg" controlId="password">
            <Form.Label>رمز عبور</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="mt-4">
            <Button size="md" type="submit" disabled={!validateForm()}>
              ورود
            </Button>
          </div>
          <div>{error}</div>
          <div className="text-sm  mt-2">
            <Link to="/signup">اکانت ندارم/ثبت نام</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
