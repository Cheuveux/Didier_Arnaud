import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShareButton } from "./ShareButton";
import Seo from "./SEO/SEO";
import './articlePage.css';

function renderTextWithFootnoteLinks(text, blockIndex, childIndex) {
	const parts = text.split(/(\(\d+\))/g);

	return parts.map((part, index) => {
		const match = part.match(/^\((\d+)\)$/);
		if (!match) return <span key={`${blockIndex}-${childIndex}-${index}`}>{part}</span>;

		const noteNumber = match[1];
		const referenceId = `note-reference-${noteNumber}-${blockIndex}-${childIndex}-${index}`;
		return (
			<a
				key={referenceId}
				href={`#note-${noteNumber}`}
				id={referenceId}
				data-note-reference={noteNumber}
				className="footnote-reference"
				aria-label={`Voir la note ${noteNumber}`}
				onClick={(event) => {
					event.preventDefault();
					document.getElementById(`note-${noteNumber}`)?.scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				}}
			>
				({noteNumber})
			</a>
		);
	});
}

function renderBlock(block, index, className = "", linkFootnotes = true) {
	const children = block.children?.map((child, childIndex) => (
		<span key={`${index}-${childIndex}`}>
			{linkFootnotes
				? renderTextWithFootnoteLinks(child.text || "", index, childIndex)
				: child.text || ""}
		</span>
	));

	if (block.type === "paragraph") return <p className={className} key={index}>{children}</p>;
	if (block.type === "heading") {
		const Tag = `h${block.level}`;
		return <Tag className={className} key={index}>{children}</Tag>;
	}
	return null;
}

export default function ArticlePage() {
	const { id } = useParams();
	const [isLoading, setIsLoading] = useState(true);
	const [post, setPost] = useState(null);
	const [error, setError] = useState(null);

	// Ajouter le blur sur les pages d'articles
	useEffect(() => {
		document.body.classList.add("blur-bg");
		return () => {
			document.body.classList.remove("blur-bg");
		};
	}, []);

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
			
			{/* SEO COMPONENT */}
			<Seo 
				title={post.Titre ?? "Untilted"}
				description={post.Description?.slice(0, 155) ?? "Article Untilted du blog de Didier Arnaud"}
				url={`/aritcles/${post.id}`}
				type="articles"
			/>
			
			<div className="back_link">
				<Link to="/">← Retour</Link>
			</div>
			<div className="article_page_header">
				<h1 className="article_page_title">{post.Titre}</h1>
			<div className="article_page_meta">
				<p className="article_page_date">{post.Date}</p>
				<ShareButton articleId={id} articleTitle={post.Titre} />
			</div>
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
				{post.Contenu?.map((block, index) => renderBlock(block, index))}
			</div>
			{post.Notes?.length > 0 && (
				<section className="article_page_notes" aria-labelledby="notes-title">
					<h2 id="notes-title">Notes</h2>
					{post.Notes.map((block, index) => (
						<div className="footnote" id={`note-${index + 1}`} key={index}>
							<span className="footnote-number">({index + 1})</span>
							<div className="footnote-content">
								{renderBlock(block, `note-${index}`, "", false)}
							</div>

							<a
								className="footnote-back"
								href={`#note-reference-${index + 1}`}
								aria-label={`Revenir à la référence ${index + 1}`}
								onClick={(event) => {
									event.preventDefault();
									document.querySelector(`[data-note-reference="${index + 1}"]`)?.scrollIntoView({
										behavior: "smooth",
										block: "center"
									});
								}}
							>↩</a>
						</div>
					))}
				</section>
			)}
		</div>
	);
}