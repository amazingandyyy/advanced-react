import React, { Component } from 'react';
import storeProvider from './storeProvider';

class Timestamp extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('hhey');
  }
  render() {
    return (
      <div>
        {this.props.timestamp.toLocaleTimeString([], {hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit'})}
      </div>
    );
  }
}

function extraProps(store) {
  return {
    timestamp: store.getState().timestamp
  };
}

export default storeProvider(extraProps)(Timestamp);