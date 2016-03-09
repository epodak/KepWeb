require('normalize.css');
require('styles/App.css');

import React from 'react';


class Index extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.error !== this.props.error;
    }
  render() {
    //console.log("Another rendered..");
    return (
        
        <div>htf did you get here?</div>


    );
  }
}


export default Index;
