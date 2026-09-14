const	SITE_NAME = "Par Monts et par Vaux, blog de Didier Arnaud";
const	DEFAULT_IMAGE = "./favicon.svg";
const	SITE_URL = "https://www.didier-arnaud.fr/";

function Seo({title, description, image, url, type= 'website'}) {
	const	fullTitle = title === SITE_NAME ? title : `${title} - ${SITE_NAME}`;
	const	fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

	return (
		<>
			<title>{fullTitle}</title>
			<meta name="description" content={description}/>

			<meta property="og:title" content={fullTitle}/>
			<meta property="og:description" content={description}/>
			<meta property="og:image" content={image || DEFAULT_IMAGE}/>
			<meta property="og:type" content={type}/>
			<meta property="og:url" content={fullUrl}/>
			<meta property="og:site_name" content={SITE_NAME}/>

			<meta name="twitter:card" content = "summar_large_image"/>
			<meta name="twitter:title" content = {fullTitle}/>
			<meta name="twitter:description" content = {description}/>
			<meta name="twitter:image" content = {image || DEFAULT_IMAGE}/>

			<link rel="canonical" href={fullUrl}/>
			
		</>
	)
}

export default Seo;