const setCookie = (name, value, days, httpOnly = false) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  let cookieStr = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  if (httpOnly) {
    cookieStr += ";HttpOnly";
  }
  document.cookie = cookieStr;
};

function deleteCookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
export default { setCookie, deleteCookie };

// setCookie(
//   "jwtToken",
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2Nzg3MDUyMTEsImp0aSI6IlFQSEd3WGhKc2hCMHhXK09iK0U1c0VEa1pwaUNVRmozXC9KV05la3BUS1BJPSIsImlzcyI6Imh0dHBzOlwvXC90ZXN0aW5nLnByZXNvbHYzNjAuY29tXC8iLCJuYmYiOjE2Nzg3MDUyMTEsImV4cCI6MTY3ODcwNTgxMSwiZGF0YSI6eyJyb2xlIjoiYWRtaW4iLCJpZCI6MSwiaXAiOiIxMTAuMjI2LjE3Ny40MiJ9fQ.VoOiyP-CSkPfe3AeEKAbizeohg1NuowTqqsbmcUUHLukScDBcbnPQbdgJfzSP3I2MIyogM6dHV2nPOHn1pTU0A",
//   30,
//   true
// );
