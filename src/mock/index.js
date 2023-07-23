const Mock = require("mockjs");
const Random = Mock.Random;
function addDayToDate(dateString, n) {
  var date = new Date(dateString); // 将日期字符串转换为Date对象
  date.setDate(date.getDate() + n); // 将日期加一天
  return date.toISOString(); // 返回日期部分的字符串
}
function weatherInfo(params) {
  let item = JSON.parse(params.body);
  return {
    data: Mock.mock({
      forecasts: [
        {
          "casts|4": [
            {
              "date|+1": [
                "2023-07-15",
                "2023-07-16",
                "2023-07-17",
                "2023-07-18",
              ],
              "week|+1": [6, 7, 1, 2],
              "dayweather|1": ["多云", "阵雨", "晴"],
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
        },
      ],
    }),
  };
}
function statisticsHour(params) {
  let item = JSON.parse(params.body);
  return {
    data: Mock.mock({
      "content|7": [
        {
          "dateTime|+1": [
            "2023-07-15 10:00",
            "2023-07-15 11:00",
            "2023-07-15 12:00",
            "2023-07-15 13:00",
            "2023-07-15 14:00",
            "2023-07-15 15:00",
            "2023-07-15 16:00",
          ],
          "list|5": [
            {
              sensor: "a01007",
              "data|3-25": 1,
              "max|3-25": 1,
              "min|30-40": 1,
              flag: "N",
              "name|+1": ["风速", "温度", "雨量", "水位", "水温"],
            },
          ],
        },
      ],
    }),
  };
}
function statisticsDay(params) {
  let item = JSON.parse(params.body);
  return {
    data: Mock.mock({
      "content|7": [
        {
          "dateTime|+1": [
            item.startTime,
            addDayToDate(item.startTime, 1),
            addDayToDate(item.startTime, 2),
            addDayToDate(item.startTime, 3),
            addDayToDate(item.startTime, 4),
            addDayToDate(item.startTime, 5),
            item.endTime,
          ],
          "list|5": [
            {
              sensor: "a01007",
              "data|3-25": 1,
              "max|3-25": 1,
              "min|30-40": 1,
              flag: "N",
              "name|+1": ["风速", "温度", "雨量", "水位", "水温"],
            },
          ],
        },
      ],
    }),
  };
}
function weatherStatistics(params) {
  let item = JSON.parse(params.body);
  return {
    data: Mock.mock({
      result: {
        "pm25L1|3-25": 12,
        "pm25L2|0-5": 0,
        "pm25L3|0-5": 0,
        "pm25L4|0-5": 0,
        "pm25L5|0-5": 0,
        "pm25L6|0-5": 0,
        "pm10L1|0-5": 10,
        "pm10L2|0-5": 2,
        "pm10L3|0-5": 0,
        "pm10L4|0-5": 0,
        "pm10L5|0-5": 0,
        "pm10L6|0-5": 0,
        "highTempNum|0-15": 11,
        "normalTempNum|0-5": 1,
        "lowTempNum|0-5": 0,
      },
    }),
  };
}
function environmentReality(params) {
  // let item = JSON.parse(params.body);
  return {
    data: Mock.mock({
      "realtimeData|6": [
        {
          sensor: "a01007",
          "data|0-20.1-2": 1,
          flag: "N",
          "name|+1": ["风速", "风力", "温度", "雨量", "水位", "水温"],
        },
      ],
    }),
  };
}

const mock1 = Mock.mock(
  RegExp("/v3/weather/weatherInfo" + ".*"),
  "get",
  weatherInfo
);
const mock2 = Mock.mock("/openApi/his/data/hour", "post", statisticsHour);
const mock3 = Mock.mock("/api/airquality/statistics", weatherStatistics);
const mock4 = Mock.mock("/openApi/data/realtime", environmentReality);
const mock5 = Mock.mock("/openApi/his/data/day", "post", statisticsDay);

module.exports = { mock1, mock2, mock3, mock4, mock5 };
