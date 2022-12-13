import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Container from './components/container/Container';


class App extends Component{
  state ={
    data: null
  };
  componentDidMount(){
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

callBackendAPI = async () => {
  const response = await fetch('/backend');
  const body = await response.json();

  if (response.status !== 200) {
    throw Error(body.message) 
  }
  return body;
};
render(){
  return (
    <Container/>
  );
}
}

export default App;
