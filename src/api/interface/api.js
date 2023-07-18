import requestRes from "@/api/request";
import qs from "qs";

const api = {
  hour: "/openApi/his/data/hour",
  minute: "/openApi/his/data/minute",
  day: "/openApi/his/data/day",
  weather: "/v3/weather/weatherInfo",
  statistics: "/api/airquality/statistics",
  reality: "/openApi/data/realtime",
};
const key = "2e28736bc08c0e9cfb979de91b465f49";
const sn = "MjAyMzA1MDgwMzEwMDAwNA==";
export function weatherInfo(data) {
  return requestRes({
    url: api.weather,
    method: "get",
    params: { key, ...data },
  });
}
export function weatherStatistics(data) {
  return requestRes({
    url: api.statistics,
    method: "post",
    data: data,
  });
}
export function statisticsHour(params) {
  return requestRes({
    url: api.hour,
    method: "post",
    data: { sn, ...params },
  });
}
export function statisticsMinute(params) {
  return requestRes({
    url: api.minute,
    method: "post",
    data: { sn, ...params },
  });
}
export function statisticsDay(params) {
  return requestRes({
    url: api.day,
    method: "post",
    data: { sn, ...params },
  });
}
//环境实况
export function environmentReality() {
  return requestRes({
    url: api.reality,
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify({ SN: sn }),
  });
}
