require('normalize.css');
require('styles/App.css');
require('styles/site.css');
require('styles/flexboxgrid.css');

import React from 'react';

import connectToStores from 'alt-utils/lib/connectToStores';

import XslStore from '../stores/XslStore';
import XslActions from '../actions/XslActions';


@connectToStores
class Xsl extends React.Component {
  static getStores() {
    //console.log("called getstores");
    return [ XslStore];
  }
  static getPropsFromStores() {
    return {
        xsl: XslStore.getState()
    };
  }
  
  componentDidMount() {
    XslActions.fetchXsl(`/${this.props.params.xsl}.xsl`,`/${this.props.params.xml}.xml`);
    
  }
  shouldComponentUpdate(nextProps) {
        return nextProps.xsl !== this.props.xsl;
    }
  
   
  render() {
    return (
      <div className="index" dangerouslySetInnerHTML={{__html:this.props.xsl}}>
      </div>
    );
  }
}


export default Xsl;
