import React, { Component } from "react";
import firebase from "../config/firebase"
import AddToCalendar from "react-add-to-calendar"

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersList:false,
      sent: false,
      recieved: false,
      userArr: [],
    };
  }

  //Logout

  logout = () => {

    firebase.auth().signOut()
      .then(() => {
        console.log("sign out");
        this.props.history.replace("/");
      })
      .catch(function (error) {
      });
  };

  componentDidMount() {
    this.renderSent();
  }

  renderSent = () => {
    var { userArr } = this.state;
    const userID = this.props.userID;
    console.log(userID);
    var starCountRef = firebase.database().ref(`UsersProfile/${userID}/sent`);
    starCountRef.on('child_added', (snapshot) => {
      console.log('data===>', snapshot.val());
      userArr.push({ ...snapshot.val() });
      this.setState({
        userArr
      })
    })
  }
  sentData = () => {
    var { userArr } = this.state;
    const userID = this.props.userID;
    console.log(userID);

    var starCountRef = firebase.database().ref(`UsersProfile/${userID}/sent`);
    starCountRef.on('child_added', (snapshot) => {
      console.log('data===>', snapshot.val());
      userArr.push({ ...snapshot.val() });
      this.setState({
        userArr
      })
    })
  }
  recievedData = () => {
    var { userArr } = this.state;
    const userID = this.props.userID;
    console.log(userID);

    var starCountRef = firebase.database().ref(`UsersProfile/${userID}/requests`);
    starCountRef.on('child_added', (snapshot) => {
      console.log('data===>', snapshot.val());
      userArr.push({ ...snapshot.val() });
      this.setState({
        userArr
      })
    })
  }

  render() {
    const { usersList, sent, recieved } = this.state;
    return (
      <div id="dashboard">
        <button onClick={this.edit} className="btn btn-default btn-block container">Edit Profile</button>
        <button onClick={this.logout} className="btn btn-info btn-block container" id="logout">Logout</button>
        <div className="container card" id="dash">
          <div className="card-body">
            <button onClick={this.navUserCards} className="btn btn-default btn-block">Set a meeting</button>
            <button className="btn btn-default btn-block" onClick={this.sent}>Sent requests</button>
            <button className="btn btn-default btn-block" onClick={this.recieved}>Recieved requests</button>
          </div>
          <div className="card-body" id="meetingList">
            <h2 className="text-center">Meetings List</h2>
              {!usersList && !sent && !recieved && this.renderUI()}
              {!recieved && usersList && this.renderUI2()}
              {!recieved && sent && this.renderUI3()}
          </div>
        </div>
      </div>
    );
  }
  edit = () => {
    this.props.history.replace("/Nickname");
  }
  sent = () => {
    this.setState({
      usersList:true
    })
    this.sentData();
  }
  recieved = () => {
    this.setState({
      sent:true
    })
    this.recievedData();
  }
  renderUI = () => {
    return this.state.userArr.map((val) => {
      return (
        <div className="card">
          <div className="card-body">
            <img src={val.img} height="100" width="100" id="userimg"/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Name:&nbsp;{val.username}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Status:&nbsp;{val.status}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Date:&nbsp;{val.date}</span> <br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Time:&nbsp;{val.time}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>At:&nbsp;{val.place}</span> 
          </div>
        </div>
      )
    })
  }
  renderUI2 = () => {
    let icon = { 'calendar-plus-o': 'left' };
    return this.state.userArr.map((val) => {
      return (
        <div className="card">
          <div className="card-body">
            <img src={val.img} height="100" width="100" id="userimg"/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Name:&nbsp;{val.username}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Status:&nbsp;{val.status}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Date:&nbsp;{val.date}</span> <br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Time:&nbsp;{val.time}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>At:&nbsp;{val.place}</span> 
          </div>
        </div>
      )
    })
  }
  renderUI3 = () => {
    let icon = { 'calendar-plus-o': 'left' };
    let event = {
      title: 'Sample Event',
      description: 'This is the sample event provided as an example only',
      location: 'Portland, OR',
      startTime: '2016-09-16T20:15:00-04:00',
      endTime: '2016-09-16T21:45:00-04:00'
    };
    let myArr = this.props.location.state.myArr;
    //console.log(this.state.userArr);
    //console.log(myArr);
    console.log("Imglink====",this.props.image)
    return this.state.userArr.map((val) => {
      return (
        <div className="card">
          <div className="card-body">
          <img src={this.props.image} height="100" width="100" id="userimg"/>
            <img src={val.img} height="100" width="100" id="userimg"/><br/>
            <div style={{ display:"inline",marginTop:"-2%"}}>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Name:&nbsp;{val.username}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Status:&nbsp;{val.status}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Date:&nbsp;{val.date}</span> <br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>Time:&nbsp;{val.time}</span><br/>
              <span className="font-weight-bold" style={{ marginLeft:"2%"}}>At:&nbsp;{val.place}</span> 
            </div>
            <div>
              <button className="btn btn-success" onClick={this.status}>Confirm</button>
              <button className="btn btn-danger" onClick={this.status2}>Cancel</button>
              <AddToCalendar event={event} buttonTemplate={icon} />
            </div>
          </div>
        </div>
      )
    })
  }
status = () => {
  const userID = this.props.userID;
  let dbRef = firebase.database().ref(`UsersProfile/${userID}/requests`);
    dbRef.set({
      status:"Accepted"
    });
}
status2 = () => {
  const userID = this.props.userID;
  let dbRef = firebase.database().ref(`UsersProfile/${userID}/requests`);
    dbRef.set({
      status:"Rejected"
    });
}
  navUserCards = () => {
    this.props.history.replace("/UserCards");
  };
}

export default Dashboard;