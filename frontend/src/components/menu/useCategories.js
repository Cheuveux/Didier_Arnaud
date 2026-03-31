import {useEffect, useState} from 'react'

export function useCategories() {
	const [categories, setCategories] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		fetch(`${process.env.REACT_APP_API_URL}/api/categories`)
			.then(res =>res.json())
			.then(json => {
				const formatted = json.data.map(item => ({
					id: item.id,
					name: item.Name,
				}))
				setCategories(formatted)
				setLoading(false)
			})
			.catch((err) => {
				console.error('Error loading categories:', err) // DEBUG
				setError('Erreur de chargement')
				setLoading(false)
			})
	}, [])
	return {categories, loading, error}
}