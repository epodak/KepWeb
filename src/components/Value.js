require('normalize.css');
require('styles/App.css');

import React from 'react';
import FontAwesome  from 'react-fontawesome';



class Value extends React.Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.value !== this.props.value;
    }
  render() {
    //console.log("Another rendered..");
    return (
            <span>
                {this.props.value
                    ?  (this.props.value.Succeeded
                        ? (
                            this.props.value.Value instanceof Array
                            ? this.props.value.Value.map((v,i)=>
                                <span key={i}>
                                        {v instanceof Object ? JSON.stringify(v): (v!=undefined ? v.toString(): undefined)}
                                        <span className  ='divider'  name='plus-square-o'>|</span>
                                </span>)
                            : this.props.value.DisplayValue
                            )
                        : <FontAwesome title = {this.props.value.Exception}  name='warning' className="warning" />)
                    : undefined
                }
            </span>
    );
  }
}
export default Value;
