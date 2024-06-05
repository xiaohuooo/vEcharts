// 获取甘特图数据
export function getGanttData() {
  return Promise.resolve({
    "status": 0,
    "message": "success",
    "data": {
      "data": [{
          id: 1,
          text: '黄河大桥',
          start_date: '2020-04-01',
          start_date1: '2020-04-01',
          duration: 10,
          progress: 1,
          open: true,
          order: 1,
          parent: 0
        },
        {
          id: 2,
          text: '一号桥墩',
          start_date: '2020-04-01',
          duration: 5,
          progress: 1,
          open: true,
          order: 1,
          parent: 1
        },
        {
          id: 3,
          text: '二号桥墩',
          start_date: '2020-04-06',
          duration: 5,
          progress: 1,
          open: true,
          order: 2,
          parent: 1
        },
        {
          id: 4,
          text: '灌注桩#1',
          start_date: '2020-04-01',
          duration: 1,
          progress: 1,
          open: true,
          order: 1,
          parent: 2
        },
        {
          id: 5,
          text: '灌注桩#2',
          start_date: '2020-04-02',
          duration: 2,
          progress: 1,
          open: true,
          order: 3,
          parent: 2
        },
        {
          id: 6,
          text: '灌注桩#3',
          start_date: '2020-04-06',
          duration: 2,
          progress: 1,
          open: true,
          order: 3,
          parent: 3
        },
        {
          id: 7,
          text: '灌注桩#4',
          start_date: '2020-04-07',
          duration: 2,
          progress: 1,
          open: true,
          order: 3,
          parent: 3
        },
        {
          id: 8,
          text: '灌注桩#5',
          start_date: '2020-04-08',
          duration: 2,
          progress: 1,
          open: true,
          order: 3,
          parent: 3
        }
      ],
      "links": [{
        id: 1,
        source: 2,
        target: 3,
        type: '0'
      }]
    }
  })
}

// 获取甘特图播放数据
export function getGanttDataPlay() {
  return Promise.resolve({
    "2020-04-01": ['00001.00001.00005.00004-00001'],
    "2020-04-02": [],
    "2020-04-03": ['00001.00001.00005.00004-00002'],
    "2020-04-04": [],
    "2020-04-05": [],
    "2020-04-06": [],
    "2020-04-07": ['00001.00001.00005.00004-00001'],
    "2020-04-08": ['00001.00001.00005.00004-00002'],
    "2020-04-09": ['00001.00001.00005.00004-00001'],
    "2020-04-10": []
  })
}
