const { dotenv, axios, matchersWithOptions } = require("../index");
dotenv.config();
expect.extend(
  matchersWithOptions({
    verbose: true,
  })
);

describe("Delete user", () => {
  jest.setTimeout(7000);
  test("validate status : 204", async () => {
    const response = await axios.delete(
      `${process.env.baseUrl}/api/users/${process.env.user_id_delete}`
    );
    expect(response.status).toBe(204);
  });
  test("Validate content", async () => {
    const response = await axios.delete(
      `${process.env.baseUrl}/api/users/${process.env.user_id_delete}`
    );
    expect(response.data).toBeFalsy();
  });
});
