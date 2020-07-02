import http from "../http";

const ApiBaseUrl = "api/v1/nly_data_analysis/";

export default {
  getReturnData: function(obj, data) {
    const url = `${ApiBaseUrl}get_return_data/`;
    http.nlyPost(url, data).then(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
      }
    );
  }
};
