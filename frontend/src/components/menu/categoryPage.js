import { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Nav } from './nav'
import backgroundMountain from '../../assets/background_mountain.png'
import snowBg from '../../assets/snow.png'
import voyage_bg from '../../assets/voyage_bg.png'
import './categoryPage.css'
import '../articles.css'

// Map category names to background images
const categoryBackgrounds = {
  'mountain': backgroundMountain,
  'snow': snowBg,
  'voyage': voyage_bg,
  'default': backgroundMountain
}

export function CategoryPage() {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const articleRefs = useRef([])

  // Add blur effect when entering category page
  useEffect(() => {
    document.body.classList.remove("blur-bg")
    return () => {
      document.body.classList.remove("blur-bg")
    }
  }, [])

  // Add hover blur effect to articles
  useEffect(() => {
    const items = articleRefs.current
    const cleanups = items.map((item) => {
      if (!item) return () => {}

      const onEnter = () => {
        document.body.classList.add("blur-bg")
      }
      const onLeave = () => {
        document.body.classList.remove("blur-bg")
      }

      item.addEventListener("mouseenter", onEnter)
      item.addEventListener("mouseleave", onLeave)
      return () => {
        item.removeEventListener("mouseenter", onEnter)
        item.removeEventListener("mouseleave", onLeave)
      }
    })
    return () => cleanups.forEach((fn) => fn())
  }, [articles])

  useEffect(() => {
    // Set background image for body::before based on category slug
    const bg = categoryBackgrounds[slug.toLowerCase()] || categoryBackgrounds.default
    document.body.style.setProperty('--bg-image', `url(${bg})`)

    // Filtre les articles par name de catégorie
    const url = `${process.env.REACT_APP_API_URL}/api/articles`
      + `?filters[category][Name][$eq]=${slug}`
      + `&populate=category`
      + `&sort=updatedAt:desc`

    fetch(url)
      .then(res => res.json())
      .then(json => {
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

  // Restore default background when leaving category page
  useEffect(() => {
    return () => {
      document.body.style.setProperty('--bg-image', `url(${categoryBackgrounds.default})`)
    }
  }, [])

  return (
    <>
      <Nav />
      <main className="category-page">
        <ul className="category-articles">
          {articles.map((article, i) => (
            <li key={article.id} ref={(el) => (articleRefs.current[i] = el)}>
              <Link to={`/article/${article.documentId}`} className="article_card">
                <div className="article_content">
                  <div className="article_header">
                    <h2 className='article_title'>
                      {article.Titre}
                    </h2>
                    <p className="article_date">{article.Date}</p>
                  </div>

                  <div className="article_desc">
                    {article.Image?.[0]?.url ? (
                      <img
                        className="img_article_desc"
                        src={`${process.env.REACT_APP_API_URL}${article.Image[0].url}`}
                        alt="Illustration descriptive de l'article"
                        loading="lazy"
                      />
                    ) : (
                      <div className="img_article_spacer"></div>
                    )}
                    <p className="text_article_desc">{article.Description}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}