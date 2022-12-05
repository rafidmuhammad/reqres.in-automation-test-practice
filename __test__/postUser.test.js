const { dotenv, axios, matchersWithOptions } = require("../index");
dotenv.config();
expect.extend(
  matchersWithOptions({
    verbose: true,
  })
);

describe("Create user", () => {
  const body = {
    name: process.env.body_createUser_name,
    job: process.env.body_createUser_job,
  };
  let response;
  beforeAll(async () => {
    response = await axios.post(`${process.env.baseUrl}/api/users`, body);
  });
  test("validate status : 201", async () => {
    expect(response.status).toBe(201);
  });

  test("validate static object", async () => {
    expect(response.data).toEqual(expect.objectContaining(body));
  });
  test("Validate json schema", async () => {
    const schema = {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        job: {
          type: "string",
        },
        id: {
          type: "string",
        },
        createdAt: {
          type: "string",
        },
      },
      required: ["name", "job", "id", "createdAt"],
    };
    expect(response.data).toMatchSchema(schema);
  });
});
