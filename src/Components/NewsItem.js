import React from 'react'

const NewsItem = (props)=> {
    let { title, description, imageURL, newsURL, author, datePublished, source } = props
    return (
      <div className="card my-3">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'90%'}}>{source}</span>
        <img src={imageURL} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{title}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">By: <strong>{author}</strong></h6>
          <h6 className="card-subtitle mb-2 text-body-secondary">{datePublished}</h6>
          <p className="card-text" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</p>
          <a href={newsURL} rel="noreferrer" className="btn btn-sm btn-primary" target='_blank'>Read More</a>
        </div>
      </div>
    )
  }
  NewsItem.defaultProps = {
    author: 'Anonymous'
  }

export default NewsItem
