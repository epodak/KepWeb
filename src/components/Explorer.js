require('normalize.css');
require('styles/App.css');

import React from 'react';
import FontAwesome  from 'react-fontawesome';


import connectToStores from 'alt-utils/lib/connectToStores';

import View from '../lib/Flex.js';
import Path from './Path';



import ValueStore from '../stores/ValueStore';
import ValueActions from '../actions/ValueActions';
import Item  from './Item';
import Value  from './Value';
import Error  from './Error';


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
  shouldComponentUpdate(nextProps) {
        return nextProps.values !== this.props.values;
    }
  componentWillReceiveProps (newProps) {
        if(newProps.location.query!== this.props.location.query){
            ValueActions.unsubscribeValue(getPathString(getPath(this.props.location.query.path)));
            ValueActions.subscribeValue(getPathString(getPath(newProps.location.query.path)));
        }
  }
  render() {
    const paths = getPath(this.props.location.query.path);
    const pathString = getPathString(paths);
    const retPaths= this.props.values.getIn(['values', pathString, 'path']) || [];
    const lastNode= retPaths.length ? retPaths[retPaths.length-1].node : undefined;
    return (

      <div className="index">
            <View row >
                <View row width="30px"/>
                <View row>
                    <Path location={this.props.location} retPaths={retPaths}/>
                </View>
            </View>
            
            {lastNode
                ? <View row >
                    <View width="45px"/>
                    <View row>
                        <Value value={this.props.values.getIn(['values', pathString, 'values', lastNode.NodeId.ExpandedText])}/>
                    </View>
                </View>

                :undefined}
            
            <View row auto>
                <View row width="60px"/>
                {this.props.values.getIn(['websocketStatus']).connected
                    ? (this.props.values.getIn(['values', pathString])
                        ? <View column>
                            <Error error={this.props.values.getIn(['values', pathString, 'error', 'response'])}/>
                            {this.props.values.getIn(['values', pathString, 'children']).map((item, index) => {
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
