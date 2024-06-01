import axios from "axios";

const basePath = "http://localhost:4000";

class HttpServices {
  // eslint-disable-next-line class-methods-use-this
  get = (path: string = "", config: any = {}) => {
    const configHeaders = {
      headers: config?.headers,
      responseType: config?.responseType,
    };
    const url = `${basePath + path}`;
    return new Promise((resolve, reject) => {
      axios
        .get(url, configHeaders)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            // const res = { error: '204 No Content...' };
            // reject(res);
            resolve({});
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  post = (path: string = "", req: any, config: any = {}) => {
    const configHeaders = {
      headers: config.headers,
    };
    const url = `${basePath + path}`;
    return new Promise((resolve, reject) => {
      axios
        .post(url, req, configHeaders)
        .then((response) => {
          // console.log('response', response);
          if (response.data) {
            resolve(response.data);
          } else {
            const res = { error: "204 No Content..." };
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  put = (path: string = "", req: any, headers: any = {}) => {
    const configHeaders: any = {
      headers,
    };
    const url = `${basePath + path}`;

    return new Promise((resolve, reject) => {
      axios
        .put(url, req, configHeaders)
        .then((response) => {
          // console.log('response', response);
          if (response.data) {
            resolve(response.data);
          } else {
            const res = { error: "204 No Content..." };
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  patch = (path: string = "", req: any, headers: any = {}) => {
    const configHeaders = {
      headers,
    };
    const url = `${basePath + path}`;

    return new Promise((resolve, reject) => {
      axios
        .patch(url, req, configHeaders)
        .then((response) => {
          // console.log('response', response);
          if (response.data) {
            resolve(response.data);
          } else {
            const res = { error: "204 No Content..." };
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  delete = (path: string = "", headers: any = {}) => {
    const configHeaders = {
      headers,
    };
    const url = `${basePath + path}`;

    return new Promise((resolve, reject) => {
      axios
        .delete(url, configHeaders)
        .then((response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            const res = { error: "204 No Content..." };
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default new HttpServices();
