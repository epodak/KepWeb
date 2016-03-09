require('normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router'
import FontAwesome  from 'react-fontawesome';


import View, {FlexColumn, FlexRow} from '../lib/Flex.js';



class Item extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.splat !== this.props.splat
            || nextProps.item !== this.props.item
            || nextProps.value !== this.props.value;
    }
  render() {
    //console.log("Another rendered..");
    const splat = this.props.splat ?  '/' + this.props.splat : '';
    return (

      <View className={this.props.index %2 ? 'stripe': '' } row  auto key={this.props.item.DisplayName}>
        <View column width="400px">
            {this.props.item.ReferenceTypeId!=='HasComponent'
                ? <Link  to={this.props.root + splat  + '/' + this.props.item.BrowseName} >
                    <FontAwesome name='folder' />
                    {this.props.item.DisplayName}
                </Link>
                :<span>
                    <FontAwesome name='tag' />
                    {this.props.item.DisplayName}
                </span>}
                
        </View>
        <View >
            {this.props.value

                ?  (this.props.value.Succeeded 
                    ? this.props.value.DisplayValue
                    : <FontAwesome title = {this.props.value.Exception}  name='warning' className="warning" />)
                : undefined
            }
        </View>
        
     </View>

    );
  }
}


export default Item;
