import React from 'react'

const ArticleCard = ({ article }) => {
  return (
    <a
      className='articleCard'
      target="_blank"
      href={ `https://www.pinkvilla.com/${article.path}` }
      rel="noreferrer">
      <div className='articlePicture'>
        <img alt={ article.title } src={ `https://www.pinkvilla.com/${article.field_photo_image_section}` } />
      </div>
      <div className='articleContent'>
        <h1>{ article.title }</h1>
        <p className='articleDate'>Dec 02, 2021 03:51 AM IST</p>
      </div>
    </a>
  )
}

export default ArticleCard
