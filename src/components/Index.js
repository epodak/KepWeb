require('normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router';


class Index extends React.Component {
    
  render() {
    //console.log("Another rendered..");
    return (
        
        <div className='index'>
        <ul>
            <li><Link to = '/explore/'>Explore</Link></li>
            <li><Link to = '/xsl/CurrentOPCServerConfiguration/document'>Document</Link></li>
            <li><Link to = '/xsl/CurrentOPCServerConfiguration/full-document'>Full Document</Link></li>
        </ul>

This project is a combination of <a href="https://github.com/gilesbradshaw/KepWeb">this</a> and  <a href="https://github.com/gilesbradshaw/KepView">this</a>
            
            
            

        </div>


    );
  }
}


export default Index;
