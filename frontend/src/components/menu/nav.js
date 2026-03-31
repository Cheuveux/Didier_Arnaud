import { Link, useLocation } from 'react-router-dom'
import { useCategories } from './useCategories'
import './nav.css'

export function Nav() {
	const {categories, loading} = useCategories()
	const {pathname} = useLocation()

	return (
		<nav className="categories-nav">
			{loading ? (
				<span></span>
			) : (
				<ul>
				{categories.map(cat => (
					<li key={cat.id}>
					<Link
						to={`/categorie/${cat.name}`}
						className={pathname === `/categorie/${cat.name}` ? 'active' : ''}
					>
						{cat.name}
					</Link>
					</li>
				))}
				</ul>
			)}
		</nav>
	)
}