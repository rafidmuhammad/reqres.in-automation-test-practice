const { dotenv, axios, matchersWithOptions } = require("../index");
dotenv.config();
expect.extend(
  matchersWithOptions({
    verbose: true,
  })
);

describe("Update user", () => {
  const body = {
    name: process.env.updateUser_name,
    job: process.env.updateUser_job,
  };
  let response;
  beforeAll(async () => {
    response = await axios.put(
      `${process.env.baseUrl}/api/users/${process.env.user_id_update}`,
      body,
      { headers: { "Accept-Encoding": "application/json" } }
    );
  });
  test("validate status : 200", async () => {
    expect(response.status).toBe(200);
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
        updatedAt: {
          type: "string",
        },
      },
      required: ["name", "job", "updatedAt"],
    };
    expect(response.data).toMatchSchema(schema);
  });
});
