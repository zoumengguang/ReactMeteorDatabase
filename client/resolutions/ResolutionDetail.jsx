import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

export default class ResolutionDetail extends TrackerReact(Component) {
   constructor() {
    super();

    this.state = {
      subscription: {
        resolutions: Meteor.subscribe("userResolutions") //user data
      }
    }
  }

  componentWillUnmount() {
    this.state.subscription.resolutions.stop();
  }

  resolution() {
    return Resolutions.findOne(this.props.id); //fetch returns an object
  }

  render() {
    let res = this.resolution();

    if(!res) {
      return(<div>Loading...</div>);
    }    

    return (
      <div>
        <h1>{res.text}</h1>
      </div>
    )
  }
}
