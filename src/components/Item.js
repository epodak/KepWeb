require('normalize.css');
require('styles/App.css');

import React from 'react';
import { Link } from 'react-router'
import FontAwesome  from 'react-fontawesome';


import View, {FlexColumn, FlexRow} from '../lib/Flex.js';



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
                    <span title={this.props.item.NodeClass}>
                        {{
                            None: <FontAwesome name="genderless"/>,
                            Variable: <FontAwesome name="question"/>,
                            Object: <FontAwesome name="cube"/>,
                            Method: <FontAwesome name="cogs"/>,
                            ObjectType: <FontAwesome name="cubes"/>,
                            VariableType: <FontAwesome name="question-circle"/>,
                            ReferenceType: <FontAwesome name="hand-pointer"/>,
                            DataType: <FontAwesome name="database"/>,
                            View: <FontAwesome name="eye"/>,
                            All: <FontAwesome name="globe"/>
                        }[this.props.item.NodeClass]}
                    </span>
                    {decodeURI(browseName)}
                </Link>
                
            </div>    
        </View>
        <View column>
            {this.props.value
                ?  (this.props.value.Succeeded 
                    ? (
                        this.props.value.Value instanceof Array
                        ? this.props.value.Value.map(v=>v instanceof Object ? JSON.stringify(v): v)
                        : this.props.value.DisplayValue
                        )
                    : <FontAwesome title = {this.props.value.Exception}  name='warning' className="warning" />)
                : undefined
            }
        </View>
        
     </View>

    );
  }
}


export default Item;
