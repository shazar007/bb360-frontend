import { useNavigate } from "react-router-dom";

export function useAppNavigate() {
  const navigate = useNavigate();

  const goTo = (path: any) => {
    navigate(path);
  };

  const replaceTo = (path: any) => {
    navigate(path, { replace: true });
  };

  const goBack = () => {
    navigate(-1);
  };

  const goForward = () => {
    navigate(1);
  };

  const goWithState = (path: any, state = {}) => {
    navigate(path, { state });
  };

  return {
    goTo,
    replaceTo,
    goBack,
    goForward,
    goWithState,
  };
}
