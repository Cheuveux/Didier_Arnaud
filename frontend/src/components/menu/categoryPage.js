import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Nav } from './nav'
import './categoryPage.css'

export function CategoryPage() {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    // Filtre les articles par name de catégorie
    const url = `${process.env.REACT_APP_API_URL}/api/articles`
      + `?filters[category][Name][$eq]=${slug}`
      + `&populate=category`
      + `&sort=updatedAt:desc`

    console.log('Fetching from URL:', url) // DEBUG
    fetch(url)
      .then(res => res.json())
      .then(json => {
        console.log('Response data:', json) // DEBUG
        const articlesData = json.data || []
        setArticles(articlesData)
        if (articlesData.length > 0) {
          setCategoryName(articlesData[0].category?.Name || slug)
        } else {
          setCategoryName(slug)
        }
      })
      .catch(err => {
        console.error('Error:', err)
      })
  }, [slug])

  return (
    <>
      <Nav />
      <main className="category-page">
        <h1>{categoryName || slug}</h1>
        <ul className="category-articles">
          {articles.map((article) => (
            <li key={article.id}>
              <Link to={`/article/${article.documentId}`}>
                {article.Titre}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}