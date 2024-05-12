import React from "react";
import "./Login.css";
import { ReactComponent as LoginSVG } from "../../assets/login.svg";
import { emailPattern } from "../../util/constants";
import isUserAuthenticated from "../../util/auth";
import { setAuthenticated } from "../../redux/action";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setEmail(e.target.value);
    const isValid = emailPattern.test(e.target.value);
    setIsEmailValid(isValid);
  }

  React.useEffect(() => {
    if (!props.isAuthenticated) {
      navigate("/login");
    } else {
      navigate("/");
    }
  }, [props.isAuthenticated]);

  function handleSubmit() {
    const isValid = emailPattern.test(email);
    if (isValid) {
      props.setAuthenticated(isUserAuthenticated());
      sessionStorage.setItem("user-email", email);
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 0);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-svg">
          <LoginSVG />
        </div>
        <div className="login-welcome-title">
          Welcome <br />
          Back
        </div>
        <div className="login-form">
          <div className="login-input">
            <label htmlFor="email-input">Email</label>
            <input
              type="email"
              name="email"
              id="email-input"
              placeholder="email@email.com"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="login-button">
            <button
              type="button"
              className={`${isEmailValid ? null : "disabled"}`}
              onClick={handleSubmit}
            >
              {!isSignUp ? "Register" : "Login"}
            </button>
          </div>
          <hr />

          <div className="login-signup">
            {isSignUp ? (
              <h2>New to our website ?</h2>
            ) : (
              <h2>Already registered ?</h2>
            )}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Register" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setAuthenticated: (data) => dispatch(setAuthenticated(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.isLoading,
    isAuthenticated: state.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
