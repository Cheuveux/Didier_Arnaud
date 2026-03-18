import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './a_propos.css'

function renderBlocks(blocks) {
  return blocks.map((block, i) => {
    if (block.type === 'heading') {
      const Tag = `h${block.level}`;
      return <Tag key={i}>{block.children.map(c => c.text).join('')}</Tag>;
    }
    if (block.type === 'paragraph') {
      return (
        <p key={i}>
          {block.children.map((child, j) => {
            if (child.type === 'link') {
              return (
                <a key={j} href={child.url} target="_blank" rel="noreferrer">
                  {child.children.map(c => c.text).join('')}
                </a>
              );
            }
            return child.text;
          })}
        </p>
      );
    }
    return null;
  });
}
export default function APropos() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/a-proposs?populate=*`)
			.then(res =>res.json())
			.then(json => setData(json.data[0]));
	}, []);

	if (!data)
		return <p>Chargement...</p>
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