const BASE_URL = process.env.REACT_APP_BASE_URL || "http://192.168.0.33:4000";

export const login = async (user: any) => {
  console.log(user);
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  });
  const json = await response.json();
  console.log(json);
  return json;
};

export const logout = async () => {
  localStorage.removeItem("token");
  document.cookie = `empty`;
  window.location.href = "/login";
};

export const singup = async (user: any) => {
  console.log(user);
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(user),
  });
  const json = await response.json();
  console.log(json);
  return json;
};

export const splitAndSave = async () => {};

export const setUser = async (user: any) => {
  let toCookie = user.token.slice(0, user.token.length / 2);
  let toLocalStorage = user.token.slice(user.token.length / 2);

  document.cookie = `token=${toCookie};`;
  localStorage.setItem("token", toLocalStorage);
  localStorage.setItem("name", user.name);
};

export const getUser = () => {
  let name = localStorage.getItem("name");
  let tokenLocalStorage = localStorage.getItem("token");
  let tokenCookie = getCookie("token");
  if (tokenCookie && tokenLocalStorage) {
    return { name, token: tokenCookie + tokenLocalStorage };
  }
  return false;
};

function getCookie(name: string) {
  // Add the = sign
  name = name + "=";

  // Get the decoded cookie
  var decodedCookie = decodeURIComponent(document.cookie);

  // Get all cookies, split on ; sign
  var cookies = decodedCookie.split(";");

  // Loop over the cookies
  for (var i = 0; i < cookies.length; i++) {
    // Define the single cookie, and remove whitespace
    var cookie = cookies[i].trim();

    // If this cookie has the name of what we are searching
    if (cookie.indexOf(name) === 0) {
      // Return everything after the cookies name
      return cookie.substring(name.length, cookie.length);
    }
  }
}
