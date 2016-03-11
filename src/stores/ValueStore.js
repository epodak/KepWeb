import alt from '../alt/alt';
import request from 'browser-request';
import OpcStream from '../streams/OpcStream';
import ValueActions from '../actions/ValueActions';

import immutable from 'alt-utils/lib/ImmutableUtil';
import Immutable from 'immutable';

import config from 'config';


let o= new OpcStream();
            
@immutable
class ValueStore {
  constructor() {
    const _this=this;
    this.bindListeners({
      subscribeValue: ValueActions.subscribeValue,
      unsubscribeValue: ValueActions.unsubscribeValue
    });

  this.state = Immutable.Map({
      values: Immutable.Map({}),
      websocketStatus:{initial:true, state: 'initial'}
    });
  o.observable.subscribe((websocketStatus)=>
      _this.setState(_this.state.setIn(['websocketStatus'], websocketStatus)));
 
  }
  unsubscribeValue(pathString) {
    //this will test for no subscriptions left and remove..
    //let dd = this.state.getIn('values', path, 'data');
    
    let _this=this;
    if(this._lastUnsubscribe)
      this._lastUnsubscribe.dispose();
    this._lastUnsubscribe =  o.observable.where(stream=>stream.connected).subscribe((stream)=> {
      stream.unsubscribe(
              _this.state.getIn(['values', pathString, 'data'])
                .filter(d=>d.NodeClass==='Variable')
                .map(d=>d.NodeId.ExpandedText)
            );
      _this.state.getIn(['values', pathString, 'subscriptions']).dispose();
      _this.setState(_this.state.deleteIn(['values'], pathString));

    });
  }
  
  subscribeValue(pathString) {
    let _this=this;
    //let _query = path==='' ? 'objects' : 'variables';
    if(this._lastSubscribe)
      this._lastSubscribe.dispose();
    
    this._lastSubscribe = o.observable.subscribe((stream)=> {
      if(stream.connected) {
        request({method:'GET', url:`${config.service}/${pathString}`, json:true}, function(error, response) {
          _this.setState(_this.state.setIn(['values', pathString], new Immutable.Map({
              data: response ? response.body : [],
              error: new Immutable.Map(error),
              values:new Immutable.Map(),
              subscriptions: stream.subscribe(
                (response ? response.body : [])
                  .filter(d=>d.NodeClass==='Variable')
                  .map(d=>d.NodeId.ExpandedText)
              ).subscribe((s)=> {

                  _this.setState(_this.state.setIn(['values', pathString,'values', s.message.Node],s.message));
                  
                })})));
        
        });
      }
        else 
          _this.setState(_this.state.deleteIn(['values', pathString]));

    });
  }
}
 
export default alt.createStore(ValueStore, 'ValueStore');