import React, { Component } from "react";
import "../App.css"

class Beverages extends Component {
  constructor(props){
    super(props);

  }
  next3 = () => {
    this.props.history.push("/Map");
  };

  render() {
    return ( <div className="container form-group card" id="beverages">
          <form className="card-body">
              <h1 align="center">Select Beverages</h1>
              <div className="card-body" id="bev">
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;Coffee &nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" 
                    className="form-control" name="Coffee" value="Coffee" id="Coffee" 
                    onChange={this.props.b1}/>
                  </label>
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Juice &nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" 
                    className="form-control" name="Juice" value="Juice" id="Juice" 
                    onChange={this.props.b2}/>
                  </label>
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;Cocktail &nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="checkbox" 
                    className="form-control" name="Cocktail" value="Coffee" id="Cocktail" 
                    onChange={this.props.b3}/>
                  </label><br/>
              </div>
              <h1 align="center">Duration of meeting</h1>
              <div className="card-body" id="dur">
                  <label>&nbsp;&nbsp;&nbsp;20 Minutes&nbsp;&nbsp;&nbsp;
                    <input type="checkbox" className="form-control" name="20" value="20" id="T1" onChange={this.props.t1}/>
                  </label>
                  <label>&nbsp;&nbsp;&nbsp;60 Minutes&nbsp;&nbsp;&nbsp;
                    <input type="checkbox" className="form-control" name="60" value="60" id="T2" onChange={this.props.t2}/>
                  </label>
                  <label>&nbsp;&nbsp;&nbsp;&nbsp;120 Minutes&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="checkbox" className="form-control" name="120" value="120" id="T3" onChange={this.props.t3}/>
                  </label><br/>
              </div>
              <button  onClick={this.next3} className="btn btn-primary btn-block">Next</button>
          </form>

        </div>
    );
  }
}

export default Beverages;
