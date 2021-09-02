/* global Vue axios */ //> from vue.html
const $ = (sel) => document.querySelector(sel);
const GET = (url) => axios.get("/user" + url);
const POST = (cmd, data) => axios.post("/user" + cmd, data);

const activities = new Vue({
  el: "#app",

  data: {
    list: [],
    activity: undefined,
  },

  methods: {
    search: ({ target: { value: v } }) =>
      activities.fetch(v && "&$search=" + v),

    async fetch(etc = "") {
      const { data } = await GET(`/UserActivities${etc}`);
      activities.list = data.value;
    },

    async inspect(eve) {
      const activity = (activities.activity =
        activities.list[eve.currentTarget.rowIndex - 1]);
      const res = await GET(`/Activities/${activity.id}?$select=title`);
      Object.assign(activity, res.data);
      setTimeout(() => $("form > input").focus());
    },
  },
});

// initially fill list of activities
activities.fetch();
