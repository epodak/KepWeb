require('normalize.css');
require('styles/App.css');
import { Link } from 'react-router';

import React from 'react';


class Title extends React.Component {
  render() {
    //console.log("Another rendered..");
    return (
        <div className='index'>
            <Link to='/'>
                <h1>Transit Opc Server</h1>
            </Link>
            {this.props.children}
        </div>


    );
  }
}


export default Title;
