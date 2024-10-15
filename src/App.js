import './App.css';
import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;
  state = {progress: 0}
  setProgress = (progress)=>{this.setState({progress: progress})}
  render() {
    return (
      <BrowserRouter>
      <Navbar/>
      <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        onLoaderFinished={()=> this.setProgress(0)}
      />
      <div className='container my-3'>
      <Routes>
            <Route exact path="/" element={<News apiKey={this.apiKey} setProgress={this.setProgress} key={'general'}/>}/>
            <Route exact path="/business" element={<News apiKey={this.apiKey} setProgress={this.setProgress} category={'business'} key={'business'}/>}/>
            <Route exact path="/entertainment" element={<News apiKey={this.apiKey} setProgress={this.setProgress} category={'entertainment'} key={'entertainment'}/>}/>
            <Route exact path="/health" element={<News apiKey={this.apiKey} setProgress={this.setProgress} category={'health'} key={'health'}/>}/>
            <Route exact path="/science" element={<News apiKey={this.apiKey} setProgress={this.setProgress} category={'science'} key={'science'}/>}/>
            <Route exact path="/sports" element={<News apiKey={this.apiKey} setProgress={this.setProgress} category={'sports'} key={'sports'}/>}/>
            <Route exact path="/technology" element={<News apiKey={this.apiKey} setProgress={this.setProgress} category={'/technology'} key={'technology'}/>}/>
          </Routes>
      </div>
      </BrowserRouter>
    )
  }
}
