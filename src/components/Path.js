require('normalize.css');
require('styles/App.css');

import linq from 'linq';
import React from 'react';
import { Link } from 'react-router'
import FontAwesome  from 'react-fontawesome';

import View from '../lib/Flex.js';
import ItemIcon from './ItemIcon';



function getPathString(paths){
    return `?path=${paths.filter(p=>p).join('&path=')}`;
    
}


class Path extends React.Component {
  shouldComponentUpdate(nextProps) {
        return nextProps.retPaths !== this.props.retPaths
            || nextProps.location !== this.props.location  ; // || nextProps.todos !== this.props.todos;
    }
  render() {
    //console.log("Another rendered..");
    const root= '/explore';
    const retPaths= this.props.retPaths;
    return (

      <View row auto>
            <Link to={root + '/'}><FontAwesome name='home' /></Link>.
            {
                linq.from(retPaths).take(retPaths.length-1)
                .toArray()
                .reduce((prev,current,index)=>{
                    if(index===0)
                        return [[current]];
                    prev.push(prev[index-1].slice());
                    prev[index].push(current);
                    return prev;
                },[])
                .map((f, i)=><span key={i}>
                    { f[f.length-1].node
                        ? <Link to={root + '/' + getPathString(f.map(f=>f.browseName.replace(/#/g, '%23')))} >
                            <ItemIcon nodeClass={f[f.length-1].node.NodeClass}/>
                            <span>{f[f.length-1].browseName}</span>
                        </Link>
                        : f.browseName
                    }
                    .
                    </span>)}
                {linq.from(retPaths).any()
                    ? (linq.from(retPaths).last().browseName[0] !=='_' && linq.from(retPaths).last().node
                        ? <Link to={'/xsl/CurrentOPCServerConfiguration/document#' + retPaths.map(p=>p.browseName).join('.')}>
                            <ItemIcon nodeClass={linq.from(retPaths).last().node.NodeClass}/>
                            <span>{linq.from(retPaths).last().browseName}</span>
                        </Link>
                        : linq.from(retPaths).last().browseName)
                    : undefined}
            </View>
    );
  }
}


export default Path;
