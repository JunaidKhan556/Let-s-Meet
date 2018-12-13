/* eslint-disable no-undef */
/* global google */

import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  withScriptjs
} from "react-google-maps";
import swal from "sweetalert";
import firebase from "../config/firebase"


class DateAndDirection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coords: {},
      date: "",
      time:"",
      showDate: true,
      myLat: this.props.location.state.lat,
      myLong: this.props.location.state.long,
      targetLat: this.props.location.state.desLat,
      targetLong: this.props.location.state.desLong
    };
  }
  render() {
    return (
      <div className="container card" id="dateanddir">
        <div className="card-body">
        {this.state.showDate && this.renderDate()}
        <button type="Submit" onClick={this.red} className="btn btn-default btn-block">Send Request</button>
        {this.renderDirection()}
        </div>
      </div>
    );
  }

  renderDate = () => {
    return (
      <div>
        <form>
            <h3 className="text-center">Select Time</h3>
            <input 
                type="time" 
                name="usr_time" 
                className="form-control"               
                value={this.state.time}
                onChange={this.handleTime}/>
            <h3 className="text-center">Select Date</h3>
            <input
              className="form-control"
              id="date"
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.handleDate}
            />
          </form>
        <br />
      </div>
    );
  };

  red = () => {
    let myId = this.props.location.state.id;
    let myName = this.props.location.state.name;
    let myImg = this.props.location.state.img;
    let place = this.props.location.state.place;
    let duration = this.props.location.state.dur;
    let myLat = this.props.location.state.desLat;
    let myLong = this.props.location.state.desLong;
    let myArr = this.props.location.state.myArr;
    console.log("------",place);
    
    swal({
        title: "Are you sure!",
        text: `Do you want to send the request`,
        icon: "success",
        buttons: true,
        dangerMode: false
      }).then(agree => {
        if (agree) {
          // localStorage.setItem("key", id);
          // this.props.history.push("/Location");
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user.uid);
                    firebase.database().ref('UsersProfile/' + user.uid +"/sent/" + myId).set({
                      username: myName,
                      place:place,
                      duration:duration,
                      lat:myLat,
                      long : myLong,
                      date:this.state.date,
                      time:this.state.time,
                      img:myImg,
                      uid:user.uid,
                      status:"Pending"
                    });
                    firebase.database().ref('UsersProfile/' + myId +"/requests/" + user.uid).set({
                      username: myName,
                      place:place,
                      duration:duration,
                      lat:myLat,
                      long : myLong,
                      date:this.state.date,
                      time:this.state.time,
                      img:myImg,
                      uid:user.uid,
                      status:"Pending",
                      myArr:myArr
                    });
            }
          });
          this.props.history.push({
            pathname: "/Dashboard",
            state: {
              myArr:myArr
            }
          });
        } else {
          return false;
        }
      });
  };

  handleDate = e => {
    console.log(e.target.value);
    this.setState({
      date: e.target.value
    });
  };
  handleTime = e => {
    console.log(e.target.value);
    this.setState({
      time: e.target.value
    });
  };

  renderDirection = () => {
    const { coords, directions } = this.state;
    // const { lat, long } = this.state;

    return (
      <div>
        <div id="directionMap">
          <MyMapComponent
            isMarkerShown
            coords={coords}
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzPdGNQeiKpaODVoQy6tjjzypqVXKNzWU&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            directions={directions}
          />
          <button onClick={this.getDirections} className="btn btn-default btn-block">
            Get Directions
          </button>
        </div>
      </div>
    );
  };

  getDirections = () => {
      console.log('props',this.props);
      
    const DirectionsService = new google.maps.DirectionsService();
    console.log(this.state.myLat,this.state.myLong,this.state.targetLat,this.state.myLong);
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(this.state.myLat, this.state.myLong),
        destination: new google.maps.LatLng(this.state.targetLat, this.state.targetLong),
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
          console.log(result,status);
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          swal({
            title: "Sorry!",
            text: `Something wrong with the network`,
            icon: "error",
            buttons: true,
            dangerMode: false
          })
        }
      }
    );
  };
  componentDidMount() {
    this.setPosition();
  }

  setPosition() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({ coords: position.coords });
    });
    console.log(this.state.coords);
    this.updateCoords(this.state.myLat,this.state.myLong);
  }

  updateCoords( latitude, longitude ) {
    this.setState({ coords: { latitude, longitude } });
    console.log(this.state.coords);
  }
}
const MyMapComponent = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={14} center={{ lat: 24.8812296, lng: 67.0727269 }}>
      <Marker position={{ lat: 24.8812296, lng: 67.0727269 }} />
      <Marker position={{ lat: 24.8861479, lng: 67.0595196 }} />

      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  ))
);


export default DateAndDirection;