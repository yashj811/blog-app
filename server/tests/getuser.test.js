const request = require("supertest");
const User = require("../models/userModel");
let server;

describe("/users/:id", () => {
  beforeEach(() => (server = require("../index")));
  afterEach(async () => {
    server.close();
    await User.remove();
  });
  describe("GET /", () => {
    it("it gets all users", async () => {
      await User.insertMany([
        {
          firstName: "yash",
          lastName: "jain",
          email: "yashj811@gmail.com",
          password: "hellothere",
        },
        {
          firstName: "yah",
          lastName: "jan",
          email: "yashj911@gmail.com",
          password: "heothere",
        },
      ]);
      const res = await request(server).get("/api/v1/user");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((el) => el.firstName === "yash")).toBe(true);
      expect(res.body.some((el) => el.firstName === "yah")).toBe(true);
    });
  });


  describe('GET /:id',() => {
      it('gets a user by id', async () => {
          const user = new User({
            firstName: "yash",
            lastName: "jain",
            email: "yashj811@gmail.com",
            password: "hellothere",
          })

          await user.save();

        const res = await request(server).get('/api/v1/user/' + user._id);
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('email', user.email);
      })
  })
});
