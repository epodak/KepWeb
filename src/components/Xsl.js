require('normalize.css');
require('styles/App.css');
require('styles/site.css');
require('styles/flexboxgrid.css');

import linq from 'linq';
import React from 'react';
import { Link } from 'react-router'
import FontAwesome  from 'react-fontawesome';

import config from 'config';

import connectToStores from 'alt-utils/lib/connectToStores';

import View, {FlexColumn, FlexRow} from '../lib/Flex.js';



import XslStore from '../stores/XslStore';
import XslActions from '../actions/XslActions';
import Item  from './Item';
import Error  from './Error';




@connectToStores
class Xsl extends React.Component {
  static getStores() {
    //console.log("called getstores");
    return [ XslStore];
  }
  static getPropsFromStores() {
    //console.log("called getpropsfromstores");
    return {
        xsl: XslStore.getState()
    };
  }
  
  componentDidMount() { 
    XslActions.fetchXsl(`/${this.props.params.xsl}.xsl`,`/${this.props.params.xml}.xml`);
    
  }
  shouldComponentUpdate(nextProps, nextState) {
        return nextProps.xsl !== this.props.xsl;
    }
  
   
  render() {
    //console.log("Another rendered..");
    return (

      <div className="index" dangerouslySetInnerHTML={{__html:this.props.xsl}}>
      
      </div>
    );
  }
}


export default Xsl;
