import axios from "axios";
// 请求登录信息，和族库数据
// 创建 axios 实例
const requestRes = axios.create({
  // API 请求的默认前缀
  timeout: 6000, // 请求超时时间
});
// requestRes interceptor
requestRes.interceptors.request.use(async (config) => {
  return config;
});

requestRes.interceptors.response.use((response) => {
  const { data } = response;
  console.log(response, "--response");

  return data;
});

export default requestRes;
