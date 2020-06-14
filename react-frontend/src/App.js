import React from 'react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/catalog')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          loading: false,
          list: json,
        });
      });
  }

  render() {
    return <div>{this.state.loading ? "Loading..." : <List items={this.state.list} />}</div>;
  }
}

export default App;
