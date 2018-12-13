import React, { Component } from "react"
import "./App.css"
import firebase from './config/firebase'
import Login from "./screens/login";
import Nickname from "./screens/nickname";
import Images from "./screens/images";
import Beverages from "./screens/beverages";
import Map from "./screens/map";
import Dashboard from "./screens/dashboard";
import UserCards from "./screens/usercard";
import NearLocations from "./screens/nearLocations";
import DateAndDirection from "./screens/dateanddirection";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import swal from "sweetalert";

//import { Provider } from 'react-redux'
//import { store, persistor } from './redux/Store'
//import { PersistGate } from 'redux-persist/integration/react'

var provider = new firebase.auth.FacebookAuthProvider();

class App extends Component {
  constructor() {
    super();
    this.state = {
      nickName: "",
      phone: "",
      longitude: "",
      latitude: "",
      imglink1: "",
      userID: "",
      imglink2: "",
      imglink3: "",
      imageNames: [],
      beverages: [],
      duration: [],
      image:'',
      img:''
    };
  }


  handleNickName = e => {
    console.log("name", e.target.value);
    this.setState({
      nickName: e.target.value
    });
  };

  handlePhone = e => {
    console.log("phone", e.target.value);
    this.setState({
      phone: e.target.value
    });
  };

  // For Images
  image1 = e => {
    let img1 = e[0];
    var storage = firebase.storage();
    var fileUpload = storage.ref('images/' + img1.name);
    fileUpload.put(img1)
      .then(x => {
        return x.ref.getDownloadURL()
      })
      .then(url => {
        console.log(url)
        this.setState({
          imglink1: url
        });
      })
      .catch(err => {
        console.log(err)
      });
  };
  image2 = e => {
    let img2 = e[0];
    var storage = firebase.storage();
    var fileUpload = storage.ref('images/' + img2.name);
    fileUpload.put(img2)
      .then(x => {
        return x.ref.getDownloadURL()
      })
      .then(url => {
        console.log(url)
        this.setState({
          imglink2: url
        });
      })
      .catch(err => {
        console.log(err)
      });
  };
  image3 = e => {
    let img3 = e[0];
    var storage = firebase.storage();
    var fileUpload = storage.ref('images/' + img3.name);
    fileUpload.put(img3)
      .then(x => {
        return x.ref.getDownloadURL()
      })
      .then(url => {
        console.log(url)
        this.setState({
          imglink3: url
        });
      })
      .catch(err => {
        console.log(err)
      });
  };
  //Beverages and time
  b1 = e => {
    console.log(e.target.checked);

    var { beverages } = this.state;
    if (e.target.checked) {
      beverages[0] = e.target.value;
      this.setState({
        beverages
      });
    }

    if (!e.target.checked) {
      delete beverages[0];
      this.setState({
        beverages
      });
    }
  };

  b2 = e => {
    console.log(e.target.checked);

    var { beverages } = this.state;
    if (e.target.checked) {
      beverages[1] = e.target.value;
      this.setState({
        beverages
      });
    }

    if (!e.target.checked) {
      delete beverages[1];
      this.setState({
        beverages
      });
    }
  };
  b3 = e => {
    console.log(e.target.checked);

    var { beverages } = this.state;
    if (e.target.checked) {
      beverages[2] = e.target.value;
      this.setState({
        beverages
      });
    }

    if (!e.target.checked) {
      delete beverages[2];
      this.setState({
        beverages
      });
    }
  };
  t1 = e => {
    console.log(e.target.checked);

    var { duration } = this.state;
    if (e.target.checked) {
      duration[0] = e.target.value;
      this.setState({
        duration
      });
    }

    if (!e.target.checked) {
      delete duration[0];
      this.setState({
        duration
      });
    }
  };
  t2 = e => {
    console.log(e.target.checked);

    var { duration } = this.state;
    if (e.target.checked) {
      duration[1] = e.target.value;
      this.setState({
        duration
      });
    }

    if (!e.target.checked) {
      delete duration[1];
      this.setState({
        duration
      });
    }
  };
  t3 = e => {
    console.log(e.target.checked);

    var { duration } = this.state;
    if (e.target.checked) {
      duration[2] = e.target.value;
      this.setState({
        duration
      });
    }

    if (!e.target.checked) {
      delete duration[2];
      this.setState({
        duration
      });
    }
  };
  //Submit Data

  submit = () => {
    const {
      userID,
      nickName,
      phone,
      longitude,
      latitude,
      imageNames,
      imglink1,
      imglink2,
      imglink3,
      beverages,
      duration
    } = this.state;
    let dbRef = firebase.database().ref(`UsersProfile/${userID}`);
    dbRef.set({
      nickName,
      userID,
      phone,
      longitude: localStorage.getItem('longitude'),
      latitude: localStorage.getItem('latitude'),
      imageNames,
      imglink1,
      imglink2,
      imglink3,
      beverages,
      duration
    });
    swal(
      {
        title: "Are you sure!",
        text: ``,
        icon: "success",
        buttons: true,
        dangerMode: false,
      });
  };
  // Login
  login = (go, goMore) => {
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        var user = result.user;
        let id = user.uid;
        let userRef = firebase.database().ref(`UsersProfile`);
        userRef.on("child_added", snap => {
          let key = snap.key;
          let data = snap.val();
          console.log("data", data);
          console.log("key", key);
          console.log("id", id);
          
          if (id === key) {
            console.log("matched");
            goMore();
          } else {
            this.setState({
              userID: user.uid,
              dname: user.displayName,
              img:user.photoURL
            });
            go();
          }
        });
      })
      .catch(function (error) { });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          userID: user.uid,
          dname: user.displayName,
          img:user.photoURL
        })
      }
    })
  }

  // Render  
  render() {
    return (
      //  <Provider store={store}>
      //     <PersistGate loading={null} persistor={persistor}>
      //       <div>
      //         <Login/>
      //       </div>
      //     </PersistGate>
      //  </Provider>

      <Router>
        <div>
          
          <h1 align="center" id="heading">
          <img
          id="logo" 
          width="70px"
          height="70px"
          src="https://i.pinimg.com/236x/2a/4a/4c/2a4a4c46d00a295115606aa211800190--fitness-logo-monogram-logo.jpg"/>
          <Link to="/">Let's Meet</Link>
          </h1>
          <Route
            exact
            path="/"
            render={props => (<Login {...props} login={this.login} />)}
          />
          <Route
            path="/Nickname"
            render={props => (
              <Nickname
                {...props}
                handleNickName={this.handleNickName}
                handlePhone={this.handlePhone}
              />
            )}
          />
          <Route
            path="/Images"
            render={props => (
              <Images
                {...props}
                image1={this.image1}
                image2={this.image2}
                image3={this.image3}
              />
            )}
          />
          <Route
            path="/Beverages"
            render={props => (
              <Beverages
                {...props}
                b1={this.b1}
                b2={this.b2}
                b3={this.b3}
                t1={this.t1}
                t2={this.t2}
                t3={this.t3}
              />
            )}
          />
          <Route
            path="/Map"
            render={props => (<Map {...props} submit={this.submit} />)}
          />
          <Route
            path="/Dashboard"
            render={props => (<Dashboard userID={this.state.userID} img={this.state.imglink1} 
              image={this.state.img} {...props} />)}
          />
          <Route
            path="/UserCards"
            render={props => (<UserCards userID={this.state.userID} {...props} />)}
          />
          <Route
            path="/NearLocations"
            render={props => (<NearLocations {...props} />)}
          />
          <Route
            path="/DateAndDirection"
            render={props => (<DateAndDirection userID={this.state.userID} {...props} />)}
          />
        </div>
      </Router>
    )
  }
}

export default App;

// redux

