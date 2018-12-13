/* eslint-disable no-undef */
/* global google */
import React, { Component } from "react";
import fire from "../config/firebase";

class NearLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myLat: "",
      myLong: "",
      arr: [],
      loaded: false,
      beveragesArr: null,
      nearBy: null,
      searchResult: [],
      showSearch: false
    };
  }
  render() {
    const {  loaded, showSearch } = this.state;
    console.log("state", this.state);

    return (
      <div >
        <div className="container card" id="searchLocation">
          {this.SearchUI()}
          {showSearch && this.renderSearch()}
          {loaded && (
            <div >
              <div>
                  <h2 className="text-center">Nearby Locations</h2>
              </div>
              <p>
                {this.state.nearBy.map((val, i) => {
                  return (
                    <div className="card-body">
                      <span>{val.venue.name}</span>
                      <span className="secondary">
                        {val.venue.location.address}
                        {val.venue.location.crossStreet}
                        <span style={{ marginLeft: 14 }}>
                          <button
                            className="btn btn-default btn-block"
                            type="submit"
                            onClick={() =>
                              this.handleLocation(
                                val.venue.name,
                                val.venue.location.lat,
                                val.venue.location.lng
                              )
                            }
                          >Select</button>
                        </span>
                      </span>
                    </div>
                  );
                })}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  renderSearch = () => {
    return (
      <div className="container" >
        {this.state.searchResult.length > 0 ? (
          <h1 className="text-center">Search Results</h1>
        ) : (
          <h1 className="text-center">No Result Found</h1>
        )}
        <div >
          <p className="card-body">
            {this.state.searchResult.map((val, i) => {
              return (
                <div>
                  <span>{val.venue.name}&nbsp;</span>
                  <span className="secondary">
                    {val.venue.location.address}&nbsp;
                    {val.venue.location.crossStreet}
                    <span style={{ marginLeft: 14 }}>
                      <button
                        className="btn btn-default btn-block"
                        type="submit"
                        onClick={() =>
                          this.handleLocation(val.venue.name,val.venue.location.lat,val.venue.location.lng)
                        }
                      >Select</button>
                    </span>
                  </span>
                </div>
              );
            })}
          </p>
        </div>
      </div>
    );
  };

  handleLocation = (name,lat,long) => {
    let myId = this.props.location.state.id;
    let myName = this.props.location.state.name;
    let myLat = this.props.location.state.lat;
    let myLong = this.props.location.state.long;
    let myImg = this.props.location.state.img;
    let myDur = this.props.location.state.dur;
    let myArr = this.props.location.state.myArr;
    let place = name;
    let desLat = lat;
    let desLong = long;
    console.log(myName,myId, myLat, myLong,desLat,desLong,myArr);
    this.props.history.push({
      pathname: "/DateAndDirection",
      state: {
        id: myId,
        name: myName,
        lat: myLat,
        long: myLong,
        img:myImg,
        place:place,
        dur: myDur,
        desLat:desLat,
        desLong:desLong,
        myArr:myArr
      }
    });
  };

  SearchUI = () => {
    return (
      <div className="card" id="search">
        <div className="card-body">
          <h1 className="text-center" style={{ color:"black"}}>Select Location</h1>
          <input type="search"
            placeHolder="Search"
            onChange={this.handeleSearch}
            className="form-control"
          />
        </div>
      </div>
    );
  };

  componentDidMount() {
      console.log("hey");
    this.getData();
  }

  fourSquare = () => {
    let client_id = "ZR2ZIDRP5WWDTYDQAIS4EDMJPLGETLG1TYKAFOSAKDLY511Z";
    let client_secret = "YTFRHASL5PTBMS43OJ45SWPNUHU130KUSOXRGWC2KHYJA0C0";
    let url = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=5&ll=${
      this.state.arr[0].latitude
    },${this.state.arr[0].longitude}&query=${this.state.beveragesArr[1]}`;

    fetch(url)
      .then(res => {
        return res.json().then(val => {
          let nearBy = val.response.groups[0].items;
          this.setState({
            nearBy: nearBy,
            loaded: true
          });
        });
      })
      .catch(function() {
        // Code for handling errors
      });
  };

  getData = () => {
    var { myLat, myLong } = this.state;
    let myId = this.props.location.state.id;
    console.log(myId);
    let myCordRef = fire.database().ref(`UsersProfile/${myId}`);
    console.log(myCordRef);
    myCordRef
      .once('value')
      .then(snap => {
        myLat = snap.val().latitude;
        myLong = snap.val().longitude;
        const { arr } = this.state;
        arr.push({
          id: snap.key,
          ...snap.val()
        });
        console.log(myLat);
        console.log(myLong);
        this.setState({
          myLat,
          myLong
        });
      })
      .then(v => {
        const { beverages } = this.state.arr[0];
        console.log(this.state.arr);
        let beveragesArr = [];

        beverages.map(val => {
          return beveragesArr.push(val);
        });

        this.setState({
          beveragesArr
        });

        this.fourSquare();
      });
  };

  handeleSearch = e => {
    if (e.target.value.length === 0) {
      this.setState({
        loaded: true,
        showSearch: false
      });
    } else {
      this.setState({
        loaded: false,
        showSearch: true
      });
    }
    let client_id = "ZR2ZIDRP5WWDTYDQAIS4EDMJPLGETLG1TYKAFOSAKDLY511Z";
    let client_secret = "YTFRHASL5PTBMS43OJ45SWPNUHU130KUSOXRGWC2KHYJA0C0";

    let url = `https://api.foursquare.com/v2/venues/explore?client_id=${client_id}&client_secret=${client_secret}&v=20180323&limit=5&ll=${
      this.state.arr[0].latitude
    },${this.state.arr[0].longitude}&query=${e.target.value}`;

    fetch(url)
      .then(res => {
        return res.json().then(val => {
          let searchResult = val.response.groups[0].items;
          console.log("search result", searchResult);
          this.setState({
            searchResult: searchResult
          });
        });
      })
      .catch(function() {
        // Code for handling errors
      });
  };
}

export default NearLocations;