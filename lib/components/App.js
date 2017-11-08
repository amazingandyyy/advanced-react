import React from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash.pickby';
// import Perf from 'react-addons-perf';

// if (typeof window !== 'undefined'){
//   window.Perf = Perf;
// }

import ArticleList from './ArticleList';
import SearchBar from './SearchBar';
import Timestamp from './TimeStamp';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  }
  getChildContext(){
    return {
      store: this.props.store
    };
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextState.articles !== this.state.articles
  //     || nextState.searchTerm !== this.state.searchTerm
  //   );
  // }
  appState = () => {
    // only subcribe to 2 store
    const { articles, searchTerm } = this.props.store.getState();
    return { articles, searchTerm };
  }
  state = this.appState(); // only subcribe to 2 store
  onStoreChange = () => {
    this.setState(this.appState());
  }
  // componentWillUpdate(p, s) {
  //   console.log(s.articles == this.state.articles);
  // }
  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }
  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }
  render() {
    let {articles, searchTerm} = this.state;
    const searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, (value)=>{
        return value.title.match(searchRE) || value.body.match(searchRE);
      });
    }
    return (
      <div>
        <Timestamp />
        <SearchBar />
        <ArticleList
          articles={articles}
        />
      </div>
    );
  }
}

export default App;