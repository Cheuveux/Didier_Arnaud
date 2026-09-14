import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const UMAMI_SCRIPT_ID = 'umami-analytics-script';

function UmamiAnalytics() {
  const location = useLocation();
  const websiteId = process.env.REACT_APP_UMAMI_WEBSITE_ID;

  useEffect(() => {
    if (!websiteId || document.getElementById(UMAMI_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement('script');
    script.id = UMAMI_SCRIPT_ID;
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.dataset.websiteId = websiteId;
    document.head.appendChild(script);
  }, [websiteId]);

  useEffect(() => {
    window.umami?.track();
  }, [location.pathname, location.search]);

  return null;
}

export default UmamiAnalytics;