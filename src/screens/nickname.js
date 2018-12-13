import React, { Component } from "react";
import "../App.css"
import firebase from "firebase"

class Nickname extends Component {
    constructor(props){
        super(props);
    }
    next1 = () => {
      this.props.history.push("/Images");
    };
  render() {
    return (<div className="container card" id="nick">
        <h1 align="center">User Detail</h1>
        <form className="form-group card-body">
            <input className="form-control"
              id="nickname"
              name="nickname"
              onChange={this.props.handleNickName}
              placeHolder="Nickname....."
            />
            <input className="form-control"
              id="phone"
              name="phone"
              placeHolder="Phone Number..."
              onChange={this.props.handlePhone}
            />
            <button onClick={this.next1} className="btn btn-primary btn-block">Next</button>
        </form>
        </div>
    );
  }

}

export default Nickname;
