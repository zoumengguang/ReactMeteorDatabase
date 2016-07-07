import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import ResolutionsForm from './ResolutionsForm.jsx';
import ResolutionSingle from './ResolutionSingle.jsx';

Resolutions = new Mongo.Collection("resolutions");

export default class ResolutionsWrapper extends TrackerReact(React.Component) {
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

  resolutions() {
    return Resolutions.find().fetch(); //fetch returns an object
  }
  render() {
    return (
      <ReactCSSTransitionGroup
        component="div"
        transitionName="route"
        transitionEnterTimeout={600}
        transitionAppearTimeout={600}
        transitionLeaveTimeout={400}
        transitionAppear={true}>
        <h1>My Database</h1>
        <ResolutionsForm />
        <ReactCSSTransitionGroup
          component="ul"
          className="resolutions"
          transitionName="resolutionLoad"
          transitionEnterTimeout={600}
          transitionLeaveTimeout={400}>
          {this.resolutions().map((resolution)=>{
            return <ResolutionSingle key={resolution._id} 
              resolution={resolution} />
          })}
        </ReactCSSTransitionGroup>
      </ReactCSSTransitionGroup>
    )
  }
}
