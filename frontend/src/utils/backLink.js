import { useLocation, useNavigate } from "react-router-dom";
import "../components/articlePage.css"

function BackLink() {
	const navigate = useNavigate();
	const { key } = useLocation();

	const handleBack = () => {
		if (key !== "default") {
			navigate(-1);          // il y a une page précédente dans l'app
		} else {
			navigate("/", { replace: true }); // arrivée directe : retour à l'accueil
		}
	};

	return (
		<div className="back_link">
			<button type="button" onClick={handleBack}>
				← Retour
			</button>
		</div>
	);
}

export default BackLink;