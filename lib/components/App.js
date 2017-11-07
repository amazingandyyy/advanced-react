import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  }
  getChildContext(){
    return {
      store: this.props.store
    };
  }
  state = this.props.store.getState();
  onStoreChange = () => {
    this.setState(this.props.store.getState());
  }
  componentDidMount() {
    this.subcriptionId = this.props.store.subscribe(this.onStoreChange);
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subcriptionId);
  }
  render() {
    let {articles, searchTerm} = this.state;
    if (searchTerm) {
      articles = pickBy(articles, (value)=>{
        return value.title.toLowerCase().match(searchTerm) || value.body.toLowerCase().match(searchTerm);
      });
    }
    return (
      <div>
        <SearchBar doSearch={this.props.store.setSearchTerm}/>
        <ArticleList
          articles={articles}
          store={this.props.store}
        />
      </div>
    );
  }
}

export default App;