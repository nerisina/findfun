import React, { Component } from 'react'

class Gif extends Component {
    constructor(props){
        super(props)
        this.state = {
            loaded: false
        }
    }

    render(){
        return(
            <video className={ `grid-item video ${this.state.loaded && 'loaded'}` } 
            onLoadedData={() => this.setState({loaded: true})}
            autoPlay 
            loop 
            src={this.props.images.original.mp4} />
        )
    }
}

export default Gif;