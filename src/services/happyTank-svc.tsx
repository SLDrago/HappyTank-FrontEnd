import HttpServices from "./http-services";

class HappyTankAPISvc {
  createCompatible = (req: any, config: any = {}) => {
    const formattedReq = {
      name1: req.name1,
      name2: req.name2,
      name3: req.name3,
    };
    return new Promise((resolve, reject) => {
      HttpServices.post(`/create/compatibility`, formattedReq, config)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getCompitibilityInfo = (req: any, config: any = {}) => {
    const formattedReq = {
      name1: req.name1,
      name2: req.name2,
      name3: req.name3,
    };
    return new Promise((resolve, reject) => {
      HttpServices.get(`/get/compatibility`, config)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
}

export default new HappyTankAPISvc();
