import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import payload from './payload';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Hello data={payload} title='Produto viagem' id='product' />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
