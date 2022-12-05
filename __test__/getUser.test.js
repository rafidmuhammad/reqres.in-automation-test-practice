const { dotenv, axios, matchersWithOptions } = require("../index");
dotenv.config();
expect.extend(
  matchersWithOptions({
    verbose: true,
  })
);

describe("get user", () => {
  let response;
  beforeAll(async () => {
    response = await axios.get(`${process.env.baseUrl}/api/users?page=2`, {
      headers: {
        "Accept-Encoding": "application/json",
        //"Content-Type": "application/json",
      },
    });
  });
  test("validate status : 201", async () => {
    expect(response.status).toBe(200);
  });

  test("validate static object", async () => {
    const body = {
      page: 2,
      per_page: 6,
      total: 12,
      total_pages: 2,
      support: {
        url: "https://reqres.in/#support-heading",
        text: "To keep ReqRes free, contributions towards server costs are appreciated!",
      },
    };
    expect(response.data).toEqual(expect.objectContaining(body));
  });
  test("Validate json schema", async () => {
    const schema = {
      type: "object",
      properties: {
        page: {
          type: "integer",
        },
        per_page: {
          type: "integer",
        },
        total: {
          type: "integer",
        },
        total_pages: {
          type: "integer",
        },
        data: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: {
                type: "integer",
              },
              email: {
                type: "string",
              },
              first_name: {
                type: "string",
              },
              last_name: {
                type: "string",
              },
              avatar: {
                type: "string",
              },
            },
            required: ["id", "email", "first_name", "last_name", "avatar"],
          },
        },
        support: {
          type: "object",
          properties: {
            url: {
              type: "string",
            },
            text: {
              type: "string",
            },
          },
          required: ["url", "text"],
        },
      },
      required: ["page", "per_page", "total", "total_pages", "data", "support"],
    };
    expect(response.data).toMatchSchema(schema);
  });
});
