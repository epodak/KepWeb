require('normalize.css');
require('styles/App.css');

import linq from 'linq';
import React from 'react';
import { Link } from 'react-router'
import FontAwesome  from 'react-fontawesome';

import config from 'config';

import connectToStores from 'alt-utils/lib/connectToStores';

import View, {FlexColumn, FlexRow} from '../lib/Flex.js';



import ValueStore from '../stores/ValueStore';
import ValueActions from '../actions/ValueActions';
import Item  from './Item';
import Error  from './Error';


function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}


@connectToStores
class Explorer extends React.Component {
  static getStores() {
    //console.log("called getstores");
    return [ ValueStore];
  }
  static getPropsFromStores() {
    //console.log("called getpropsfromstores");
    return {
        values: ValueStore.getState()
    };
  }
  
  componentDidMount() {
    ValueActions.subscribeValue(this.props.params.splat);
  }
  shouldComponentUpdate(nextProps, nextState) {
        return nextProps.values !== this.props.values || nextProps.todos !== this.props.todos;
    }
  componentWillReceiveProps (newProps) {
    if(this.props.params.splat!==newProps.params.splat)
    {
        if(this.props.params.splat!=undefined)
        {
            ValueActions.unsubscribeValue(this.props.params.splat);
        }
        ValueActions.subscribeValue(newProps.params.splat);
    }
    
  }
   
  render() {
    //console.log("Another rendered..");
    const root= '/explore';
    const parts = this.props.params.splat.split('/');
    const splat = this.props.params.splat ?  '/' + this.props.params.splat : "";
    const dotsplat = this.props.params.splat.replace(/\//g, '.');
    return (

      <div className="index">
            <View row >
                <View row width="30px"/>
                <View row>
                    <View row auto >
                    <Link to={root + '/'}><FontAwesome name='home' /></Link>.
                    {
                        linq.from(parts).take(parts.length-1)
                        .toArray()
                        .reduce((prev,current,index)=>{
                            if(index===0)
                                return [[current]];
                            prev.push(prev[index-1].slice());
                            prev[index].push(current);
                            return prev;
                        },[])
                        .map((f)=><span>
                            <Link to={root + '/' + f.join('/')} >{f[f.length-1]}</Link>
                            .
                            </span>)}
                        <Link to={'/xsl/CurrentOPCServerConfiguration/document#' + parts.join('.')}>
                          {linq.from(parts).last()}
                        </Link>
                    </View>
                    <View row />
                </View>
            </View>
            <View row >
                <View row width="60px"/>    
                {this.props.values.getIn(['websocketStatus']).connected
                    ? (this.props.values.getIn(['values', this.props.params.splat]) 

                        ? <View column>
                            <Error error={this.props.values.getIn(['values', this.props.params.splat, 'error', 'response'])}/>
                            {this.props.values.getIn(['values', this.props.params.splat, 'data']).map((item, index) => {
                                    return (
                                            <Item root='/explore' index={index} key={item.DisplayName} splat = {this.props.params.splat} item={item} value={this.props.values.getIn(['values', this.props.params.splat, 'values', dotsplat + '.' + item.DisplayName])}/>
                                    );
                                    })}
                            
                        </View>
                    

                        
                        : <View column ><FontAwesome name='spinner' /></View>)

                    : (this.props.values.getIn(['websocketStatus']).initial 
                        ? undefined
                        : <View>
                            <div>
                                <FontAwesome className='warning' name='warning' /> connection {this.props.values.getIn(['websocketStatus']).state}
                            </div>
                        </View>)}
                  


     
     
            </View>
      </div>
    );
  }
}


export default Explorer;
