<template>
  <ganttProcess
    :data="data"
    use-real-time
    end-date="2019-11"
    start-date="2019-9"
  >
  </ganttProcess>
</template>

<script>
import ganttProcess from "@/components/ganttProcess/index.vue";
export default {
  components: {
    ganttProcess,
  },
  data() {
    return {
      data: [
        {
          id: "1",
          key: "1",
          pid: "0",
          name: "一公局集团漳州联十一线总承包部",
          startDate: "2019-09-01",
          realStartDate: "2019-09-10",
          endDate: "2019-10-31",
          realEndDate: "2019-11-2",
          children: [
            {
              id: "1-1",
              key: "1-1",
              pid: "1",
              name: "路基工程",
              startDate: "2019-09-10",
              endDate: "2019-09-13",
              realStartDate: "2019-09-10",
              realEndDate: "2019-10-19",
              children: [
                {
                  id: "1-1-1",
                  key: "1-1-1",
                  pid: "1-1",
                  name: "清表",
                  startDate: "2019-09-10",
                  endDate: "2019-09-13",
                },
              ],
            },
            {
              id: "1-2",
              key: "1-2",
              pid: "1",
              name: "清理现场",
              startDate: "2019-09-17",
              endDate: "2019-09-22",
            },
            {
              id: "1-3",
              key: "1-3",
              name: "清理现场",
              pid: "1",
              startDate: "2019-09-25",
              endDate: "2019-09-30",
            },
            {
              id: "1-4",
              key: "1-4",
              pid: "1",
              name: "清理现场",
              startDate: "2019-10-03",
              endDate: "2019-10-07",
            },
            {
              pid: "1",
              id: "1-5",
              key: "1-5",
              name: "清理现场",
              startDate: "2019-10-11",
              endDate: "2019-10-19",
            },
          ],
        },
        {
          id: "2",
          key: "2",
          name: "清理现场",
          startDate: "2019-09-20",
          endDate: "2019-10-31",
        },
      ],
    };
  },
};
</script>

<style>
</style>