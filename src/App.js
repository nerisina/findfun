import React, { Component, useRef, useEffect } from 'react';
import './css/main.css';
import Header from './Header';
import Search from './Search';
import UserHint from './UserHint';
import Gif from './Gif';

const generateRandGif = dataArr => {
  const randIndex = Math.floor(Math.random() * dataArr.length);
  return dataArr[randIndex];
}

class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      searchTerm: '',
      hintText: '',
      loading: false,
      gifs: []
    } 
  }
 
 
  searchGiphy = async searchTerm => {
    this.setState({ loading: true })
    try{
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=BZSuEcIZBvTD6pmaGiw3NPnvprn8qUah&q=${searchTerm}&limit=25&offset=0&rating=G&lang=en`);
      const {data} = await response.json();
      if(!data.length){
        const err = `Nothing found for ${searchTerm}`
        throw err;
      }
      const randomGif = generateRandGif(data)
      this.setState((prevState, props) => ({ 
        ...prevState,
        gifs: [...prevState.gifs, randomGif],
        loading: false,
        hintText: `Hit enter to see more ${searchTerm}`
      }))
    }
    catch(error) {
      this.setState((prevState, props) => ({ 
        ...prevState,
        hintText: error,
        loading: false,
      })
      )
    }
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

  clearSearch = () => {
    this.setState((prevState, props) => ({
      ...prevState,
      searchTerm: '',
      hintText: '',
      gifs: [],
    }));
    this.textInput.focus();
  }

  render(){
    return (
      <div className="page">
        <Header clearSearch={this.clearSearch} hasResults={this.state.gifs.length} />
        <div className="search grid">
          { this.state.gifs.map( (gif, index) => ( <Gif key={index} {...gif} /> )) }
          <Search 
          presskey={this.handleKeyEvent}
          changed={this.handleChange}
          search={this.state.searchTerm}
          inputRef={ input => this.textInput = input }
          />
          <UserHint hinttxt={this.state.hintText} loader={this.state.loader} />
        </div>
      </div>
    )
  }
}

export default App;
