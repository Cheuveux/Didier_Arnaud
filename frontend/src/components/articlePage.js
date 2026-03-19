import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './articlePage.css';

export default function ArticlePage() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/articles/${id}?populate=*`, {
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
				setPost(data.data);
				setIsLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setIsLoading(false);
			});
	}, [id]);

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!post) return <p>Article introuvable.</p>;

	return (
		<div className="article_page">
			<div className="back_link">
				<Link to="/">← Retour</Link>
			</div>
			<div className="article_page_header">
				<h1 className="article_page_title">{post.Titre}</h1>
				<p className="article_page_date">{post.Date}</p>
			</div>
			{post.Image?.[0]?.url && (
				<img
					className="article_page_img"
					src={`${process.env.REACT_APP_API_URL}${post.Image[0].url}`}
					alt=""
				/>
			)}
			<p className="article_page_desc">{post.Description}</p>
			<div className="article_page_contenu">
				{post.Contenu?.map((block, index) => {
					if (block.type === "paragraph") {
						return <p key={index}>{block.children?.map(c => c.text).join("")}</p>;
					}
					if (block.type === "heading") {
						const Tag = `h${block.level}`;
						return <Tag key={index}>{block.children?.map(c => c.text).join("")}</Tag>;
					}
					return null;
				})}
			</div>
		</div>
	);
}