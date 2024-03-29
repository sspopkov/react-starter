import { http, HttpResponse } from "msw";

const handlers = [
  http.get("/user", () => {
    return HttpResponse.json({
      id: "15d42a4d-1948-4de4-ba78-b8a893feaf45",
      firstName: "John",
    });
  }),
];

export { handlers };
