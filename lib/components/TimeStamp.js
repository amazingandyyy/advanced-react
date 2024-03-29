import React, { PureComponent } from 'react';
import storeProvider from './storeProvider';

class Timestamp extends PureComponent {
  static timeDisplay = t => t.toLocaleTimeString([], {hour12: false, hour: '2-digit', minute: '2-digit'});
  
  render() {
    return (
      <div>
        {this.props.timestampDisplay}
      </div>
    );
  }
}

function extraProps(store) {
  return {
    timestampDisplay: Timestamp.timeDisplay(store.getState().timestamp)
  };
}

export default storeProvider(extraProps)(Timestamp);