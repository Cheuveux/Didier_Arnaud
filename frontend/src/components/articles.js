import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './articles.css';

export default function Article()
{
	const [isLoading, setIsLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
	fetch("http://localhost:1337/api/articles", {
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
    <div className="folders-stack">
      {posts.map((post) => (
        <div className="folder-card" key={post.documentId}>
          <div className="folder-svg-wrapper">
            <div className="folder-content">
              <div className="folder-header">
                <Link to={`/article/${post.documentId}`} className="article-link">
                  <h2 className="folder-title">{post.Titre}</h2>
                </Link>
              </div>
              <div className="drawer-desc">
                <p className="article-desc">{post.Description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}