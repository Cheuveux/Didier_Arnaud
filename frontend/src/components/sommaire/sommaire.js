import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Nav } from '../menu/nav';
import './sommaire.css';

export function Sommaire()
{
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const cardRefs = useRef([]);

	useEffect(() => {
	
	fetch(`${process.env.REACT_APP_API_URL}/api/articles?populate=*`, {
		method: "GET",
		headers: {
		Accept: "application/json",
		},
	})
		.then((res) => {
		if (!res.ok) throw new Error("Not found");
		return res.json();
		})
		.then((data) => {
		console.log("Articles data:", data.data); // Vérifie la structure
		const sortedPosts = (data.data || [])
		.sort((a, b) => {
			const dateA = new Date(a.updatedAt || a.createdAt);
			const dateB = new Date(b.updatedAt || b.createdAt);
			return dateB - dateA; // Plus récents d'abord
		})
		setPosts(sortedPosts);
		setIsLoading(false);
		})
		.catch((err) => {
		setError(err.message);
		setIsLoading(false);
		});
	}, []);

	// GSAP animation for sommaire articles appearance
	useEffect(() => {
		if (posts.length > 0) {
			gsap.fromTo(
				cardRefs.current,
				{
					opacity: 0,
					y: -20
				},
				{
					opacity: 1,
					y: 0,
					duration: 0.4,
					stagger: 0.08,
					ease: 'power2.out'
				}
			)
		}
	}, [posts]);

	if (isLoading) return <p>Meditation en cours...</p>;
  if (error) return <p>Error: {error}</p>;


  return (
    <>
      <Nav />
      <div className="sommaire">
		<h1 className="sommaire_title">SOMMAIRE</h1>
      {!posts.length && <p>No articles found.</p>}
      {posts.map((post, i) => (
        <Link
          key={post.documentId}
          to={`/article/${post.documentId}`}
          className="article_sommaire_link"
          ref={(el) => (cardRefs.current[i] = el)}
        >
			<div className="sommaire_content">
					<h3 className="sommaire--article_title">{post.Titre}</h3>
			</div>
        </Link>
      ))}
      </div>
    </>
  );
}