import { getLastPage, clearLastPage, getReturnTo, clearReturnTo } from "./redirectService";

export function redirectAfterSave(navigate, tenant) {
  const returnTo = getReturnTo();
  if (returnTo) {
    clearReturnTo();
    navigate(returnTo);
    return;
  }

  const last = getLastPage();
  if (last) {
    navigate(last);
    return;
  }

  navigate(`/${tenant}/tournaments`);
}

export function redirectAfterDelete(navigate, tenant) {
  const last = getLastPage();
  if (last && !last.includes("/edit")) {
    navigate(last);
    return;
  }

  navigate(`/${tenant}/tournaments`);
}

export function redirectBack(navigate, tenant) {
  const last = getLastPage();
  if (last) {
    navigate(last);
    return;
  }

  navigate(`/${tenant}`);
}

export function redirectToLastPageOrDefault(navigate, tenant) {
  const last = getLastPage();
  if (last) {
    navigate(last);
    return;
  }

  navigate(`/${tenant}`);
}