import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import $ from 'jquery';
import $script from 'scriptjs';
window.jQuery = $;
require('ms-signalr-client');

$script("http://localhost:18939/signalr/hubs", function() {
  // Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));

});
;
