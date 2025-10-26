import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TrailingSlashRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname, search, hash } = location;

    // Skip if:
    // - already ends with '/'
    // - looks like a file (contains '.')
    // - is just '/'
    if (
      pathname === "/" ||
      pathname.endsWith("/") ||
      pathname.includes(".")
    ) {
      return;
    }

    navigate(`${pathname}/${search}${hash}`, { replace: true });
  }, [location, navigate]);

  return null;
};

export default TrailingSlashRedirect;
