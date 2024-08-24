import { Component } from "react";
import axios from "axios";

class SignUp extends Component {
  state = {
    username: "",
    password: "",
    confirm_password: "",
    userDetailsList: [],
    errors: {
      username: "",
      password: "",
      confirm_password: "",
    },
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        this.setState({ userDetailsList: response.data }, () => {
          console.log("User Details List:", this.state.userDetailsList);
        });
      })
      .catch((error) => {
        console.error("There was an error fetching the user details!", error);
      });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password, confirm_password } = this.state;

    if (password !== confirm_password) {
      this.setState({
        errors: {
          ...this.state.errors,
          confirm_password: "Passwords do not match!",
        },
      });
      return;
    }

    axios
      .post("http://localhost:5000/signup", { username, password })
      .then((response) => {
        console.log("User Created Successfully:", response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error:", error.response.data.message);
          alert(error.response.data.message);
        } else if (error.request) {
          console.error("No response received:", error.request);
        } else {
          console.error("Error:", error.message);
        }
      });

    this.setState({
      username: "",
      password: "",
      confirm_password: "",
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errors: { ...this.state.errors, [event.target.name]: "" }, // Clear error on change
    });
  };

  handleBlur = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (name === "confirm_password" && value !== this.state.password) {
      error = "Passwords do not match!";
    } else if (name === "username" && !value) {
      error = "Username is required!";
    } else if (name === "password" && !value) {
      error = "Password is required!";
    }

    this.setState({ errors: { ...this.state.errors, [name]: error } });
  };

  render() {
    return (
      <div className="register-card">
        <h1>Register</h1>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {this.state.errors.username && (
            <p className="error">{this.state.errors.username}</p>
          )}
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {this.state.errors.password && (
            <p className="error">{this.state.errors.password}</p>
          )}
          <br />
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirm_password"
            placeholder="Enter Confirm Password"
            value={this.state.confirm_password}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
          />
          {this.state.errors.confirm_password && (
            <p className="error">{this.state.errors.confirm_password}</p>
          )}
          <br />
          <button type="submit">Register</button>
          <p>
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    );
  }
}

export default SignUp;
