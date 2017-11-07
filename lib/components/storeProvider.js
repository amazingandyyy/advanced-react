import React from 'React';
import PropTypes from 'prop-types';

const storeProvider = (extraProps) => ((Component) => {
  // const WithStore = (props, { store }) =>
  //   <Component {...props} store={store} />;
  // WithStore.contextTypes = {
  //   store: PropTypes.object
  // };
  // WithStore.displayName = `${Component.name}Container`;

  return class extends React.Component {
    static contextTypes = {
      store: PropTypes.object
    };
    static displayName = `${Component.name}Container`;
    render() {
      return <Component 
        {...this.props}
        {...extraProps(this.context.store, this.props)}
        store={this.context.store} />;
    }
  };
});

export default storeProvider;