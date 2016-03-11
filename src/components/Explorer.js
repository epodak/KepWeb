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

function getPath(path){
    if(!path)
        return [];
    else
        return path instanceof Array ? path : [path]
}

function getPathString(paths){
    return `?path=${paths.filter(p=>p).map(p=>`${encodeURI(p).replace(/#/g, '%23')}`).join('&path=')}`;
    
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
    ValueActions.subscribeValue(getPathString(getPath(this.props.location.query.path)));
  }
  shouldComponentUpdate(nextProps, nextState) {
        return nextProps.values !== this.props.values; // || nextProps.todos !== this.props.todos;
    }
  componentWillReceiveProps (newProps) {
        if(newProps.location.query!== this.props.location.query){
            ValueActions.unsubscribeValue(getPathString(getPath(this.props.location.query.path)));
            ValueActions.subscribeValue(getPathString(getPath(newProps.location.query.path)));
        }
  }
  render() {
    //console.log("Another rendered..");
    const root= '/explore';
    const parts = this.props.params.splat.split('/');
    const paths = getPath(this.props.location.query.path);// instanceof Array ? this.props.location.query.path : [this.props.location.query.path]
    const pathString = getPathString(paths);
    return (

      <div className="index">
            <View row >
                <View row width="30px"/>
                <View row>
                    <View row auto >
                    <Link to={root + '/'}><FontAwesome name='home' /></Link>.
                    {
                        linq.from(paths).take(paths.length-1)
                        .select(part=>part.replace(/#/g, '%23'))
                        .toArray()
                        .reduce((prev,current,index)=>{
                            if(index===0)
                                return [[current]];
                            prev.push(prev[index-1].slice());
                            prev[index].push(current);
                            return prev;
                        },[])
                        .map((f)=><span>
                            <Link to={root + '/' + getPathString(f)} >{f[f.length-1]}</Link>
                            .
                            </span>)}
                        {linq.from(paths).any() 
                            ? (linq.from(paths).last()[0] !=='_'
                                ? <Link to={'/xsl/CurrentOPCServerConfiguration/document#' + parts.join('.')}>
                                    {linq.from(paths).last()} 
                                </Link>
                                : linq.from(paths).last())
                            : undefined}
                    </View>
                    <View row />
                </View>
            </View>
            <View row >
                <View row width="60px"/>    
                {this.props.values.getIn(['websocketStatus']).connected
                    ? (this.props.values.getIn(['values', pathString]) 

                        ? <View column>
                            <Error error={this.props.values.getIn(['values', pathString, 'error', 'response'])}/>
                            {this.props.values.getIn(['values', pathString, 'data']).map((item, index) => {
                                    return (
                                        <Item root='/explore' index={index} key={item.DisplayName} pathString={pathString} path={paths}  item={item} value={this.props.values.getIn(['values', pathString, 'values', item.NodeId.ExpandedText])}/>
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
