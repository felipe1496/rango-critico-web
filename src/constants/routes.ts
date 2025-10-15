export const routes = {
  landing: {
    home: "/",
  },
  auth: {
    login: "/login",
  },
  account: {
    profile: "/:username",
    settings: "/settings",
  },
  reviews: {
    index: "/:username/reviews",
  },
};
