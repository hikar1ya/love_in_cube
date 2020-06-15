import React from 'react';
import './App.css';
import List from './components/List';
import AppBar from './components/AppBar';

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
    return <>
      <AppBar />
      <List items={this.state.list} />
    </>;
  }
}

export default App;
