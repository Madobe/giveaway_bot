const nock = require("nock");

const mockGsheets = () => {
  nock.disableNetConnect();
  nock(/www\.googleapis\.com/)
    .get(/.*/)
    .reply(200, {});
  nock(/www\.googleapis\.com/)
    .persist()
    .filteringPath(() => "/")
    .post("/")
    .reply(200, {});
  nock(/sheets\.googleapis\.com/)
    .persist()
    .get(/.*/)
    .reply(200, {
      values: [
        ["One", 1],
        ["Two", 2],
        ["Three", 3],
        ["Four", 4]
      ]
    });
};

module.exports = mockGsheets;