import React, { Component } from "react";
import Cards, { Card } from "react-swipe-deck";
import fire from "../config/firebase";
import swal from "sweetalert";

class UserCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
      myArr:[]
    };
  }
  render() {
    return (
      <div className="container card" id="users">
          <h1 align="center">Users</h1>
        {this.state.userArr.length > 0 && this.renderCards()}
      <div />
      </div>
    );
  }

  componentDidMount() {
    console.log("done");
    this.getUsers();

  }

  getUsers = () => {
    const userID = this.props.userID;
    const { userArr, myArr } = this.state;
    let dbRef = fire.database().ref("UsersProfile");
    dbRef.on("value", snap => {
      snap.forEach(val => {
        if(val.key != userID){
        userArr.push({ id: val.key, ...val.val() });
        console.log("userarr==",userArr);
        this.setState({
          userArr
        });
      }
      else{
        myArr.push({ id: val.key, ...val.val() });
        console.log("=====myarray ",myArr);
        this.setState({
          myArr
        });
      }
      });
    });
  };

  renderCards = () => {
    return (
      <div className="container" id="userCard">
        <Cards
          size={[330, 400]}
          cardSize={[350, 300]}
          className="master-root"
          onEnd={this.onEnd}
        >
          {this.state.userArr.map((val, i) => {
            return (
              <Card
                cardSize={[300, 200]}
                key={i + val.id}
                onSwipeLeft={() => this.swipeLeft(val.nickName, val.id,val.latitude,val.longitude,val.duration, val.imglink1)}
                onSwipeRight={() => this.swipeRight()}
              >
                  <div style={{ backgroundColor: "white", height: 500, opacity:0.9 }}>
                    <div>
                      <img alt="pic1" height="200" width="350" src={val.imglink1} />
                      <h5 align="center" id="username" style={{ color:"black"}}>{val.nickName}</h5>
                    </div>
                  </div>
              </Card>
            );
          })}
        </Cards>
      </div>
    );
  };

  onEnd = () => {
    //this.props.history.push("/Dashboard");
    console.log('ended');
  };
  
  swipeRight = () => {
    console.log("Right");
};

  swipeLeft = (name, id, lat, long, dur, img) => {
    swal({
      title: "Are you sure?",
      text: `Do you want to meet with ${name}.`,
      icon: "success",
      buttons: true,
      dangerMode: false
    }).then(agree => {
      if (agree) {
        // localStorage.setItem("key", id);
        // this.props.history.push("/Location");
        this.props.history.push({
          pathname: "/NearLocations",
          state: {
            name: name,
            id: id,
            lat: lat,
            long: long,
            img:img,
            dur:dur,
            myArr:this.state.myArr
          }
        });
      } else {
        return false;
      }
    });
  };
}

export default UserCards;