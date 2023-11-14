const BASE_URL = "http://vazgenmesto.nomoredomainsrocks.ru/api/";

  const checkApiResponse = (res) => {
    if (res.ok) {
      return res.json();
    } 
      return res.text().then((text) => {
        throw JSON.parse(text).message || JSON.parse(text).error;
      });
  };

  export const register = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      checkApiResponse(res);
    });
  }

  export const login = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => 
      checkApiResponse(res));
  };

  export const checkToken = (jwtToken) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Accept": "*/*",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwtToken}`,
      },
    }).then((res) => checkApiResponse(res));
  };
