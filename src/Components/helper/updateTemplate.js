const API = "https://vlz6y4dxq7.execute-api.ap-south-1.amazonaws.com/latest";

export const updateTemplate = (template) => {
  return fetch(`${API}/muse/admintemplates`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(template),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
