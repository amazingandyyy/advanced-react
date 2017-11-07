import React from 'react';
import ArticleList from '../ArticleList';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });
const {shallow} = Enzyme;

describe('ArticleList', () => {

  const testProps = {
    articles: {
      a: { id: 'a'},
      b: { id: 'b'},
    }
  };

  it('renders correctly', () => {
    const wrapper = shallow(
      <ArticleList
        {...testProps}
      />
    );
    expect(wrapper.find('ArticleContainer').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});