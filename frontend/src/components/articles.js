import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { Nav } from './menu/nav';
import './articles.css';

export default function Article()
{
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);
	const cardRefs = useRef([]);

	// Retirer le blur au chargement de la page d'accueil
	useEffect(() => {
		document.body.classList.remove("blur-bg");
	}, []);

	// GSAP hover animations
	useEffect(() => {
		const cards = cardRefs.current;
		const cleanups = cards.map((card) => {
			if (!card) return () => {};

			const onEnter = () => {
				gsap.to(card, { y: -6, scale: 1.012, duration: 0.35, ease: "power2.out" });
				document.body.classList.add("blur-bg");
			};
			const onLeave = () => {
				gsap.to(card, { y: 0, scale: 1, duration: 0.45, ease: "power2.out" });
				document.body.classList.remove("blur-bg");
			};

			card.addEventListener("mouseenter", onEnter);
			card.addEventListener("mouseleave", onLeave);
			return () => {
				card.removeEventListener("mouseenter", onEnter);
				card.removeEventListener("mouseleave", onLeave);
			};
		});
		return () => cleanups.forEach((fn) => fn());
	}, [posts]);

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
		const sortedPosts = (data.data || []).sort((a, b) => {
			const dateA = new Date(a.updatedAt || a.createdAt);
			const dateB = new Date(b.updatedAt || b.createdAt);
			return dateB - dateA; // Plus récents d'abord
		});
		setPosts(sortedPosts);
		setIsLoading(false);
		})
		.catch((err) => {
		setError(err.message);
		setIsLoading(false);
		});
	}, []);

	if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Nav />
      <div className="article_box">
      {!posts.length && <p>No articles found.</p>}
      {posts.map((post, i) => (
        <Link
          key={post.documentId}
          to={`/article/${post.documentId}`}
          className="article_card"
          ref={(el) => (cardRefs.current[i] = el)}
        >
			<div className="">
				<div className="article_content">
				<div className="article_header">
					<h2 className="article_title">{post.Titre}</h2>
					<p className="article_date">{post.Date}</p>
				</div>
				<div className="article_desc">
					{post.Image?.[0]?.url && (
						<img
							className="img_article_desc"
							src={`${process.env.REACT_APP_API_URL}${post.Image[0].url}`}
							alt="Image descriptive de l'article"
							loading = "lazy"
						/>
					)}
					<p className="text_article_desc">{post.Description}</p>
				</div>
				</div>
			</div>
        </Link>
      ))}
      </div>
    </>
  );
}