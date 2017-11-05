import React, { Component } from 'react';
import ReactDOM from 'react-dom';


export default class App extends Component {
  state = {
    answer: 42
  }
  asyncFunc = () =>{
    return Promise.resolve(37);
  }
  async componentDidMount(){
    this.setState({
      answer: await this.asyncFunc()
    });
  }
  render() {
    return (
      <div>
        {this.state.answer}
      </div>
    );
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);