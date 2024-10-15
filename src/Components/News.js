import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Load from './Load';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalize = (string) => { return string.charAt(0).toUpperCase() + string.slice(1) }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalArticles: 0
        }
        document.title = `${this.capitalize(this.props.category)} - NewsMonkey`
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalArticles: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);

    }

    async componentDidMount() {
        this.updateNews()
    }
    handlePrevClick = async () => {
        await this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.props.setProgress(10);
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticles: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
      };

    handleNextClick = async () => {
        // if (this.state.page + 1 > Math.ceil(this.state.totalArticles/this.props.pageSize)){return}
        // else{
        //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
        //     this.setState({loading: true})
        //     let data = await fetch(url);
        //     let parsedData = await data.json();
        //     this.setState({
        //         page: this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading: false
        //     })
        // }
        await this.setState({ page: this.state.page + 1 })
        this.updateNews()

    }
    render() {
        return (
            <>
                <div className='container'>
                    <h2 className='text-center'>Top Headlines</h2>
                    {this.state.loading && <Load/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalArticles}
                        loader={<Load/>}
                    >
                    <div className='row container'>
                        {/* {!this.state.loading && this.state.articles.map((element) => { */}
                        {this.state.articles.map((element) => {
                            return (
                                <div className='col-md-4' key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageURL={!element.urlToImage ? '/logo.jpeg' : element.urlToImage} newsURL={element.url} author={element.author} datePublished={new Date(element.publishedAt).toGMTString()} source={element.source.name} />
                                </div>
                            )
                        })}
                    </div>
                    </InfiniteScroll>
                </div>
                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination d-flex justify-content-between container">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-outline-success" onClick={this.handleNextClick}>Next &rarr;</button>
                    </ul>
                </nav> */}
            </>
        )
    }
}

export default News
