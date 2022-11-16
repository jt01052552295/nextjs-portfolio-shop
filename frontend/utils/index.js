export const getPath = (path = "") => (path ? `/${path}` : "");
export const createUrlParamFromObj = (params = null) => {
  if (!params) return "";
  const result = [];
  Object.keys(params).map((key) => result.push(`${key}=${params[key]}`));
  return `?${result.join("&")}`;
};
export const getCustomUrl = (url = "") => url;
export const getContentType = (type = "") => {
  switch (type) {
    case "form-data":
      return "multipart/form-data";
    default:
      return "application/json";
  }
};
export const createHeader = (value = {}, base = {}) => ({
  ...base,
  ...value,
});

export const makeRandString = (length = 10) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;

  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
