export function saveLastTenant(tenant) {
  sessionStorage.setItem("lastTenant", tenant);
}

export function loadLastTenant() {
  return sessionStorage.getItem("lastTenant");
}

export function saveLastPage(path) {
  sessionStorage.setItem("lastPage", path);
}

export function loadLastPage() {
  return sessionStorage.getItem("lastPage");
}

export function clearSessionRecovery() {
  sessionStorage.removeItem("lastTenant");
  sessionStorage.removeItem("lastPage");
}