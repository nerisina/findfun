import React, { Component } from 'react';
import './css/main.css';
import Header from './Header';
import Search from './Search';
import UserHint from './UserHint';

const generateRandGif = dataArr => {
  const randIndex = Math.floor(Math.random() * dataArr.length);
  return dataArr[randIndex];
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchTerm: '',
      hintText: 'Hit enter to search',
      gif: null,
      gifs: []
    }
  }
 
  searchGiphy = async searchTerm => {
    try{
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=BZSuEcIZBvTD6pmaGiw3NPnvprn8qUah&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`);
      const {data} = await response.json();
      const randomGif = generateRandGif(data)
      this.setState({ gif: randomGif})
    }
    catch(error) {}
  }

  handleChange = e => {
    const valueSearch = e.target.value;
    this.setState({ 
      searchTerm: valueSearch,
      hintText: valueSearch.length >2 ? `Hit enter to search ${valueSearch}` : ''
     })
  }

  handleKeyEvent = e => {
    const valueSearch = e.target.value;
    if (valueSearch.length > 2 && e.key === 'Enter'){
      this.searchGiphy(valueSearch)
    }
  } 

  render(){
    return (
      <div className="page">
        <Header />
        <Search 
        presskey={this.handleKeyEvent}
        changed={this.handleChange}
        search={this.state.searchTerm}
        gif={this.state.gif} />
        <UserHint hinttxt={this.state.hintText} />
      </div>
    )
  }
}

export default App;
