import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './articles.css';

export default function Article()
{
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
	fetch("http://localhost:1337/api/articles?populate=*", {
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
		setPosts(data.data || []);
		setIsLoading(false);
		})
		.catch((err) => {
		setError(err.message);
		setIsLoading(false);
		});
	}, []);

	if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!posts.length) return <p>No articles found.</p>;

  return (
    <div className="article_box">
      {posts.map((post) => (
        <Link key={post.documentId} to={`/article/${post.documentId}`} className="article_card">
			<div className="">
				<div className="article_content">
				<div className="article_header">
					<h2 className="article_title">{post.Titre}</h2>
					<p className="article_date">{post.Date}</p>
				</div>
				<div className="article_desc">
					<img 
					className="img_article_desc"
					src={post.Image?.[0]?.url ? `http://localhost:1337${post.Image[0].url}` : null}
					alt={post.Titre}/>
					<p className="article_desc_content">{post.Description}</p>
				</div>
				</div>
			</div>
        </Link>
      ))}
    </div>
  );
}