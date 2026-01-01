export function setLastPage(path) {
  sessionStorage.setItem("lastPage", path);
}

export function getLastPage() {
  return sessionStorage.getItem("lastPage");
}

export function clearLastPage() {
  sessionStorage.removeItem("lastPage");
}

export function setReturnTo(path) {
  sessionStorage.setItem("returnTo", path);
}

export function getReturnTo() {
  return sessionStorage.getItem("returnTo");
}

export function clearReturnTo() {
  sessionStorage.removeItem("returnTo");
}