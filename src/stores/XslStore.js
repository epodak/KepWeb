import alt from '../alt/alt';
import XslActions from '../actions/XslActions';

import immutable from 'alt-utils/lib/ImmutableUtil';


import $ from 'jquery';
window.jQuery = $;
require('xml4jquery')



           
@immutable
class XslStore {
  constructor() {
    this.bindListeners({
      fetchXsl: XslActions.fetchXsl
    });

  this.state = '';
  }
  fetchXsl(def) {
    const _this=this;
    _this.setState(undefined);
    $('<div/>').xmlTransform( $.Xml(def.xml), $.Xml(def.xsl) ).then(function(x){
      x.find('parsererror').remove();
      _this.setState(x.html());
      const hash = location.hash;
      //location.hash='';
      if(hash){
        location.replace('#');
        //norty place!
        setTimeout(()=>{
            location.replace(hash);
        },0)
          
      }
    });
    
  }
}
 
export default alt.createStore(XslStore, 'XslStore');