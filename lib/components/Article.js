import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import storeProvider from './storeProvider';

const dataDisplay = (date) => new Date(date).toDateString();

class Article extends PureComponent {
  render() {
    const { article, author } = this.props;
    return (
      <div style={styles.article}>
        <div style={styles.title}>{article.title}</div>
        <div style={styles.date}>{dataDisplay(article.date)}</div>
        <div style={styles.author}>
          <a href={author.website}>
            {author.firstName} {author.lastName}
          </a>
        </div>
        <div style={styles.body}>{article.body}</div>
      </div>
    );
  }
}

Article.propTypes = {
  article: PropTypes.shape({
    date: PropTypes.string.isRequired
  })
};

function extraProps(store, originalProps) {
  return {
    author: store.lookupAuthor(originalProps.article.authorId)
  };
}


const styles = {
  article: {
    paddingBottom: 10,
    borderBottomStyle: 'solid',
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: '0.85em',
    color: '#888',
  },
  author: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  body: {
    paddingLeft: 20,
  }};

export default storeProvider(extraProps)(Article);