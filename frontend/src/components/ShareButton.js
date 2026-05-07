import { useState } from 'react';
import './shareButton.css';

export function ShareButton({ articleId, articleTitle }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/article/${articleId}`;

    // Copier dans le presse-papiers
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);

      // Retirer le feedback après 2 secondes
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  return (
    <button
      className="share-button"
      onClick={handleShare}
      title="Copier le lien de l'article"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="18" cy="5" r="3"></circle>
        <circle cx="6" cy="12" r="3"></circle>
        <circle cx="18" cy="19" r="3"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
      </svg>
      <span className="share-text">
        {copied ? 'Copié !' : 'Partager'}
      </span>
    </button>
  );
}
