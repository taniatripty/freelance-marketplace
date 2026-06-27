import { useLocation, useNavigate } from "react-router-dom";

const useRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const redirect = () => {
    navigate(from, { replace: true });
  };

  return { redirect, from };
};

export default useRedirect;