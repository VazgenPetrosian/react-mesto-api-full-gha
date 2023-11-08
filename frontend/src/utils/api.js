class Api {
  constructor() {
    this._baseUrl = "http://localhost:4000";
  }

  _checkApiResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then((text) => {
      throw JSON.parse(text).message || JSON.parse(text).error;
    });
  }

  //лайк
  putUserLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        Accept: "*/*",
      },
      }).then((res) => {
      return this._checkApiResponse(res);
    });
  }

  deleteUserLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        Accept: "*/*",
      },
      }).then((res) => {
      return this._checkApiResponse(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          Accept: "*/*",
        },
        method: "DELETE",
      }).then((res) => this._checkApiResponse(res));
    } else {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          Accept: "*/*",
        },
        method: "PUT",
      }).then((res) => this._checkApiResponse(res));
    }
  }

  // //лайк
  editProfileInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        Accept: "*/*",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      return this._checkApiResponse(res);
    });
  }

  editUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        Accept: "*/*",
      },
        body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      return this._checkApiResponse(res);
    });
  }
  // методы с картами

  setNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        Accept: "*/*",
      },
      body: JSON.stringify({name, link}),
    }).then((res) => {
      return this._checkApiResponse(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        Accept: "*/*",
      },
      }).then((res) => {
      return this._checkApiResponse(res);
    });
  }

  getInitialCards(jwtToken) {
    return fetch(`${this._baseUrl}/cards`, 
    { headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwtToken}`,
      Accept: "*/*",
    },
   }).then((res) => this._checkApiResponse(res));
  }
  //методы с картами

  getUserData(jwtToken) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwtToken}`,
        Accept: "*/*",
      }
    }).then((res) => this._checkApiResponse(res));
  }

}

const api = new Api();
export default api;
