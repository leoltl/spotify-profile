export const generateReqHeader = method => {
  let token = sessionStorage.getItem("token");
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };
};
