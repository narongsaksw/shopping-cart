import axios from "axios";

export const functionGet = async (url, callback) => {
  await axios
    .get(url)
    .then((res) => {
      if (res.data != null) {
        callback(res.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const functionPost = async (url, formData, callback) => {
  await axios
    .post(url, formData != null ? formData : null)
    .then((res) => {
      if (res.data != null) {
        callback(res.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
