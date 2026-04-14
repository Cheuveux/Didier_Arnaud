import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './a_propos.css'

function renderBlocks(blocks) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }
  
  return blocks.map((block, i) => {
    if (!block) return null;
    
    if (block.type === 'heading') {
      const Tag = `h${block.level}`;
      const children = block.children && Array.isArray(block.children) 
        ? block.children.map(c => c?.text || '').join('')
        : '';
      return <Tag key={i}>{children}</Tag>;
    }
    
    if (block.type === 'paragraph') {
      const children = block.children && Array.isArray(block.children)
        ? block.children.map((child, j) => {
            if (!child) return null;
            if (child.type === 'link') {
              const linkText = child.children && Array.isArray(child.children)
                ? child.children.map(c => c?.text || '').join('')
                : '';
              return (
                <a key={j} href={child.url} target="_blank" rel="noreferrer">
                  {linkText}
                </a>
              );
            }
            return child.text || '';
          })
        : '';
      return <p key={i}>{children}</p>;
    }
    
    return null;
  });
}
export default function APropos() {
	const [data, setData] = useState(null);

	useEffect(() => {
		document.body.classList.add("blur-bg");
		return () => {
			document.body.classList.remove("blur-bg");
		};
	}, []);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/a-proposs?populate=*`)
			.then(res =>res.json())
			.then(json => setData(json.data[0]));
	}, []);

	// if (!data)
	// 	return <p>Chargement...</p>
	if (!data)
		return <p>Édition en cours...</p>
	return (
		<div className='a-propos'>
			<div className='returnBtn'>
			<Link to='/'>← Retour</Link>
			</div>
			<section className='auteur-info'>
				{renderBlocks(data.Description)}
			</section>
			<section className='auteur-publications'>
				{renderBlocks(data.Article_Journal)}
			</section>
		</div>
	)
}