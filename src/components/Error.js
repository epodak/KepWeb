require('normalize.css');
require('styles/App.css');

import React from 'react';
import FontAwesome  from 'react-fontawesome';


import View, {FlexColumn, FlexRow} from '../lib/Flex.js';


class Error extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.error !== this.props.error;
    }
  render() {
    //console.log("Another rendered..");
    return (
        
        this.props.error 
            ? <div><FontAwesome className='warning' name='warning' />{this.props.error.statusText}</div>
            : <noscript/>
        


    );
  }
}


export default Error;
