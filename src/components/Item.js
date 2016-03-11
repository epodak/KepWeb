require('normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router'

import ItemIcon from './ItemIcon';
import View from '../lib/Flex.js';
import Value from './Value';



class Item extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.item !== this.props.item
            || nextProps.value !== this.props.value;
    }
  render() {
    //console.log("Another rendered..");
    const browseName  = this.props.item.BrowseName; //this.props.item.BrowseName.replace(/#/g, '%23');
    const paths= `${this.props.pathString}&path=${encodeURI(browseName).replace(/#/g, '%23')}`;

    return (
      <View className={this.props.index %2 ? 'stripe': '' } row  auto key={this.props.item.DisplayName}>
        <View column width="400px">
            <div title = {JSON.stringify(this.props.item)}>
                <Link  to={this.props.root + '/' + paths} >
                    <ItemIcon nodeClass= {this.props.item.NodeClass}/>
                    <span>{decodeURI(browseName)}</span>
                </Link>
            </div>
        </View>
        <View column>
            <Value value={this.props.value}/>
        </View>
     </View>
    );
  }
}


export default Item;
