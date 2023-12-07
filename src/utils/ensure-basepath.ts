if (!window.location.pathname.includes(process.env.BASE_PATH)) {
  window.history.replaceState(
    "",
    "",
    process.env.BASE_PATH + window.location.pathname,
  );
}
