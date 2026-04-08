import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCategories } from './useCategories'
import './nav.css'

export function Nav() {
	const {categories, loading} = useCategories()
	const {pathname} = useLocation()
	const isOnCategoryPage = pathname.startsWith('/categorie/')
	const [isDrawerOpen, setIsDrawerOpen] = useState(false)
	const drawerItemsRef = useRef([])
	const drawerRef = useRef(null)

	const toggleDrawer = () => {
		setIsDrawerOpen(!isDrawerOpen)
	}

	const closeDrawer = () => {
		setIsDrawerOpen(false)
	}

	// GSAP animation for drawer opening/closing and items
	useEffect(() => {
		if (isDrawerOpen) {
			// Animate items in from right to left
			gsap.fromTo(
				drawerItemsRef.current,
				{
					opacity: 0,
					x: 100
				},
				{
					opacity: 1,
					x: 0,
					duration: 0.5,
					stagger: 0.1,
					ease: 'power2.out'
				}
			)
		} else {
			// Stop all animations when drawer closes
			gsap.killTweensOf(drawerItemsRef.current)
		}
	}, [isDrawerOpen])

	return (
		<>
			{/* Desktop Nav - shown on desktop only */}
			<nav className="categories-nav">
				{loading ? (
					<span></span>
				) : (
					<ul>
						{isOnCategoryPage && (
							<li>
								<Link className="category-btn-return" to="/">
									← Retour
								</Link>
							</li>
						)}
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

			{/* Hamburger button - only visible on mobile */}
			<button className="menu-toggle" onClick={toggleDrawer}>
				<span></span>
				<span></span>
				<span></span>
			</button>

			{/* Drawer overlay - closes drawer when clicked */}
			{isDrawerOpen && (
				<div className="drawer-overlay" onClick={closeDrawer}></div>
			)}

			{/* Drawer - mobile only */}
			<div className={`drawer ${isDrawerOpen ? 'open' : ''}`} ref={drawerRef}>
				<nav className="categories-nav drawer-nav">
					{loading ? (
						<span></span>
					) : (
						<ul>
							{isOnCategoryPage && (
								<li ref={(el) => (drawerItemsRef.current[0] = el)}>
									<Link className="category-btn-return" to="/" onClick={closeDrawer}>
										← Retour
									</Link>
								</li>
							)}
						{categories.map((cat, i) => (
							<li key={cat.id} ref={(el) => (drawerItemsRef.current[isOnCategoryPage ? i + 1 : i] = el)}>
								<Link
									to={`/categorie/${cat.name}`}
									className={pathname === `/categorie/${cat.name}` ? 'active' : ''}
									onClick={closeDrawer}
								>
									{cat.name}
								</Link>
							</li>
						))}
						</ul>
					)}
				</nav>
			</div>
		</>
	)
}