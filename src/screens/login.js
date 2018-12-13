import React, { Component } from "react";
//import { updateUser, removeUser } from '../redux/actions/authActions'
//import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);

    //this.login = this.login.bind(this);
    //this.logout = this.logout.bind(this);
  }/*
  login() {
    console.log(this.props)
    const res = { name: 'Junaid' };
    this.props.updateUser(res);
  }
  logout() {
    console.log(this.props)
    this.props.removeUser(null);
  }*/
  render() {
    return (
      //<div>
        //<button onClick={this.login}>Sign in</button>
        //<button onClick={this.logout}>Logout</button>
      //</div>
      <div className="card" id="loginCard">
      <div className="card-body">
      <img align="center" id="fblogo"
      width="190px"
      src="https://i.pinimg.com/236x/2a/4a/4c/2a4a4c46d00a295115606aa211800190--fitness-logo-monogram-logo.jpg" 
      className="rounded mx-auto d-block"/>
      <br/>
      <button id="login"
        type="submit"
        onClick={() => this.props.login(this.go, this.goMore)} className="btn btn-primary btn-block"
      >
      <img
      width="25px"
      height="25px"
      id="fbicon" 
      src="https://image.freepik.com/free-icon/facebok-circular-logo_318-40188.jpg"/>
      Login with Facebook</button>
      </div>
      </div>
    );
  }

  go = () => {
    this.props.history.push("/Nickname");
  };

  goMore = () => {
    this.props.history.push("/Dashboard");
  };
}
/*
const mapStateToProps = (state) => {
  console.log(state.authReducers.user)
  return {
    user: state.authReducers.user
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUser(user)),
    removeUser: () => dispatch(removeUser())
  }
}
*/

export default Login;
// export default connect(mapStateToProps, mapDispatchToProps)(Login);