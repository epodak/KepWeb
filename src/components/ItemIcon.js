require('normalize.css');
require('styles/App.css');

import React from 'react';
import FontAwesome  from 'react-fontawesome';





class ItemIcon extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.nodeClass !== this.props.nodeClass;
    }
  render() {
    //console.log("Another rendered..");
    return (
        <span title={this.props.nodeClass}>
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
            }[this.props.nodeClass]}
        </span>
    );
  }
}


export default ItemIcon;
