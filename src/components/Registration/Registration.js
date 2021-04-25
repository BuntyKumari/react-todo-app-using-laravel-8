import React, { Component } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import "./RegistrationStyle.css";
import showPwd from "../../images/showPwd.png";
import hidePwd from "../../images/hidePwd.png";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});
export default class Registration extends Component {
  state = {
    signupData: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      full_name: "",
    },
    hidden: true,
    errMsgFirstName: "",
    errMsgLastName: "",
    errMsgPhone: "",
    errMsgEmail: "",
    errMsgPassword: "",
    successMsg: "",
    error: false,
  };
  toggleShow = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  onChangeHandler = (e, key) => {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    var formdata = new FormData();
    formdata.append("first_name", this.state.signupData.first_name);
    formdata.append("last_name", this.state.signupData.last_name);
    formdata.append("email", this.state.signupData.email);
    formdata.append("password", this.state.signupData.password);
    formdata.append("phone", this.state.signupData.phone);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch(
      "https://todo.crazytechsolution.com/api/user/register",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState({
            signupData: {
              first_name: "",
              last_name: "",
              password: "",
              email: "",
              phone: "",
            },
            errMsgFirstName: "",
            errMsgLastName: "",
            errMsgPhone: "",
            errMsgEmail: "",
            errMsgPassword: "",
            error: false,
          });
        }
        setTimeout(() => {
          this.setState({ successMsg: result.message });
        }, 1000);
        if (result.status === "error" && result.validation_errors.first_name) {
          this.setState({
            error: true,
            errMsgFirstName: result.validation_errors.first_name[0],
          });
        }
        if (result.status === "error" && result.validation_errors.last_name) {
          this.setState({
            error: true,
            errMsgLastName: result.validation_errors.last_name[0],
          });
        }
        if (result.status === "error" && result.validation_errors.phone) {
          this.setState({
            error: true,
            errMsgPhone: result.validation_errors.phone[0],
          });
        }
        if (result.status === "error" && result.validation_errors.email) {
          this.setState({
            error: true,
            errMsgEmail: result.validation_errors.email[0],
          });
        }
        if (result.status === "error" && result.validation_errors.password) {
          this.setState({
            error: true,
            errMsgPassword: result.validation_errors.password[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <Container className="themed-container mt-2" fluid="sm">
        <div className="text-center">
          <i className="fa fa-2x fa-lock" aria-hidden="true"></i>
          <div className="text-color">Signup</div>
          <div className="hr"></div>
        </div>
        <ThemeProvider theme={theme}>
          <div className="d-flex justify-content-around mb-5">
            <div className="txt-first">
              <TextField
                error={this.state.error}
                name="first_name"
                label="First Name"
                fullWidth
                hintText="Phone"
                color="primary"
                variant="outlined"
                value={this.state.signupData.first_name}
                onChange={this.onChangeHandler}
                autoFocus
                helperText={this.state.errMsgFirstName}
              />
            </div>
            <div className="txt-last">
              <TextField
                error={this.state.error}
                name="last_name"
                label="Last Name"
                color="primary"
                variant="outlined"
                value={this.state.signupData.last_name}
                onChange={this.onChangeHandler}
                fullWidth
                helperText={this.state.errMsgLastName}
              />
            </div>
          </div>
          <div className="signup-wrapper">
            <TextField
              error={this.state.error}
              name="phone"
              label="Phone"
              type="number"
              fullWidth
              variant="outlined"
              value={this.state.signupData.phone}
              onChange={this.onChangeHandler}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value))
                  .toString()
                  .slice(0, 10);
              }}
              min={0}
              helperText={this.state.errMsgPhone}
            />
            <TextField
              error={this.state.error}
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="outlined"
              value={this.state.signupData.email}
              onChange={this.onChangeHandler}
              helperText={this.state.errMsgEmail}
            />
            <div className="show-hide-pwd-wrapper">
              <TextField
                error={this.state.error}
                name="password"
                label="Password"
                type={this.state.hidden ? "password" : "text"}
                fullWidth
                variant="outlined"
                value={this.state.signupData.password}
                onChange={this.onChangeHandler}
                helperText={this.state.errMsgPassword}
              />
              <img
                src={this.state.hidden ? showPwd : hidePwd}
                onClick={this.toggleShow}
                alt="showPwd"
                className="eyeIcon"
              />
            </div>
            <div class=" alert-success pl-5">{this.state.successMsg}</div>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              onClick={this.onSubmitHandler}
            >
              SIGN UP
            </Button>
            <p className="already-txt ml-5">
              Already have an account?
              <Link to="/login" className="sign-in-txt">
                Sign In
              </Link>
            </p>
          </div>
        </ThemeProvider>
      </Container>
    );
  }
}
