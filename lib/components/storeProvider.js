import React from 'React';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => ((Component) => {
  return class extends React.PureComponent {
    static displayName = `${Component.name}Container`;
    static contextTypes = {
      store: PropTypes.object
    };

    usedStore = () => {
      return extraProps(this.context.store, this.props);
    }

    state = this.usedStore();

    onStoreChange = () => {
      if(this.subscriptionId) {
        this.setState(this.usedStore());
      }
    }
    componentDidMount() {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
    }
    componentWillUnmount() {
      this.context.store.unsubscribe(this.subscriptionId);
      this.subscriptionId = null;
    }
    render() {
      return <Component 
        {...this.props}
        {...this.usedStore()}
        store={this.context.store} />;
    }
  };
});

export default storeProvider;