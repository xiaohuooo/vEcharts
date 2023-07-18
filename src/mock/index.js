const Mock = require("mockjs");
const Random = Mock.Random;

function weatherInfo(params) {
  let item = JSON.parse(params.body);
  return {
    data: Mock.mock({
      "data|4": [
        {
          "date|+1": ["2023-07-15", "2023-07-16", "2023-07-17", "2023-07-18"],
          "week|+1": [6, 7, 1, 2],
          "dayweather|1": ["多云", "阵雨", "阴", "晴"],
          "nightweather|1": ["阵雨", "多云", "中雨", "大雨"],
          "daytemp|30-35": 1,
          "nighttemp|25-30": 1,
          "daywind|1": ["北", "南", "东", "西"],
          "nightwind|1": ["北", "南", "东", "西"],
          "daypower|3-5": 1,
          "nightpower|3-5": 1,
          "daytemp_float|30-35.1-2": 1,
          "nighttemp_float|25-30.1-2": 1,
        },
      ],
    }),
  };
}

function setMsg() {
  let datalist = [];
  for (let i = 0; i < 10; i++) {
    let newData = {
      order: Random.natural(16),
      account: Random.name(),
      date: Random.date() + " " + Random.time(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    };
    datalist.push(newData);
  }
  return {
    data: datalist,
  };
}
const mock1 = Mock.mock(
  RegExp("/v3/weather/weatherInfo" + ".*"),
  "get",
  weatherInfo
);
// const mock2 = Mock.mock("/api/airquality/statistics", "post", setMsg);
// const mock3 = Mock.mock("/openApi/his/data/hour", setMsg);
// const mock4 = Mock.mock("/openApi/data/realtime", setMsg);
module.exports = { mock1 };
