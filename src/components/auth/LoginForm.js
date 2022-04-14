import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  let Navigate = useNavigate();

  // Context
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  const login = async (event) => {
    event.preventDefault();

    try {
      const loginData = await loginUser(loginForm);
      if (loginData.success) {
        Navigate("/dashboard");
      } else {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form className="p-4 border border-1 border-white shadow-lg" onSubmit={login}>
        <h3 className="mb-4"> LOGIN FORM </h3>
        <AlertMessage info={alert} />
        <Form.Group className="bot">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="bot">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <div className="w-100 d-flex justify-content-evenly">
          <Button className="w-25" variant="success" type="submit">
            Login
          </Button>
          <Button className="w-25 text-white" variant="info" type="button" onClick={() => Navigate("/register")}>
            Register
          </Button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
