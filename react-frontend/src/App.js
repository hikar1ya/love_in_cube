import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      list: [],
    };
  }

  componentDidMount(){
    fetch("http://127.0.0.1:5000/catalog")
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        loading: false,
        list: json.results,
      });
    });
  }

  render() {
  return <div>Alo kurluk: {this.state.loading ? "Loading..." : "Everything is ok!"}</div>;
  }
}

export default App;
