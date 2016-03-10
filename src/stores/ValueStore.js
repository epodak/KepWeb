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
  unsubscribeValue(path) {
    //this will test for no subscriptions left and remove..
    let dd = this.state.getIn('values', path, 'data');
    let _this=this;
    let _query = path==='' ? 'objects' : 'variables';
    if(this._lastUnsubscribe)
      this._lastUnsubscribe.dispose();
    this._lastUnsubscribe =  o.observable.where(stream=>stream.connected).subscribe((stream)=> {
      stream.unsubscribe(
              _this.state.getIn(['values', path, 'data'])
                .filter(d=>d.ReferenceTypeId==='HasComponent')
                .map(d=>`${path.replace(/\//g, '.')}.${d.DisplayName}`)
            );
      _this.state.getIn(['values', path, 'subscriptions']).dispose();
      _this.setState(_this.state.deleteIn(['values'], path));

    });
  }
  
  subscribeValue(path) {
    let _this=this;
    let _query = path==='' ? 'objects' : 'variables';
    if(this._lastSubscribe)
      this._lastSubscribe.dispose();
    
    this._lastSubscribe = o.observable.subscribe((stream)=> {
      if(stream.connected) {
        request({method:'GET', url:`${config.service}/${path}?query=${_query}`, json:true}, function(error, response) {
          _this.setState(_this.state.setIn(['values', path], new Immutable.Map({
              data: response ? response.body : [],
              error: new Immutable.Map(error),
              values:new Immutable.Map(),
              subscriptions: stream.subscribe(
                (response ? response.body : [])
                  .filter(d=>d.ReferenceTypeId==='HasComponent')
                  .map(d=>`${path.replace(/\//g, '.')}.${d.DisplayName}`)
              ).subscribe((s)=> {

                  _this.setState(_this.state.setIn(['values', path,'values', s.message.Node],s.message));
                  
                })})));
        
        });
      }
        else 
          _this.setState(_this.state.deleteIn(['values', path]));

    });
  }
}
 
export default alt.createStore(ValueStore, 'ValueStore');