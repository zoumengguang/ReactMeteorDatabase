import React, {Component} from 'react';

export default class ResolutionsForm extends Component {

  addResolution(event) {
    event.preventDefault(); //prevents reloading of page
    var text = this.refs.resolution.value.trim(); //gets data and trims
    if(text){
      Meteor.call('addResolution', text, (error, data)=> {
        if(error) {
          Bert.alert('Please login before submitting', 'danger', 
            'fixed-top', 'fa-frown-o');
        } else {
          this.refs.resolution.value = "";  //clears form after entry
        }
      });
    }
  }  
  
  render() {
    return (
      <form className="new-resolution" 
            onSubmit={this.addResolution.bind(this)}>
          <input
             type="text"
             ref="resolution"
             placeholder="Input Field" />
      </form>
    )
  }
}
