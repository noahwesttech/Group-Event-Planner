const { Event } = require("../models");

const eventdata = [
  {
    event_title: "Birthday Party",
    event_location: "123 Main Street",
    event_description: "Birthday Party",
    user_id: 1,
    invite_emails: [
      "test1@test.com", 
      "test2@test.com", 
      "test3@test.com", 
      "test4@test.com",
    ],
  },
  {
    event_title: "Baby Shower",
    event_location: "123 Sesame Street",
    event_description: "Baby Shower",
    user_id: 2,
    invite_emails: [
      "test10@test.com",
      "test11@test.com",
      "test12@test.com",
      "test13@test.com",
    ],
  },
  {
    event_title: "Retirement Party",
    event_location: "123 Elm Street",
    event_description: "Retirement Party",
    user_id: 3,
    invite_emails: [
      "test20@test.com",
      "test21@test.com",
      "test22@test.com",
      "test23@test.com",
    ],
  },
  {
    event_title: "Bachelor Party",
    event_location: "123 Party Street",
    event_description: "Bachelor Party",
    user_id: 4,
    invite_emails: [
      "test30@test.com",
      "test31@test.com",
      "test32@test.com",
      "test33@test.com",
    ],
  },
  {
    event_title: "Hike",
    event_location: "123 Trail Street",
    event_description: "Hike",
    user_id: 5,
    invite_emails: [
      "test40@test.com",
      "test41@test.com",
      "test42@test.com",
      "test43@test.com",
    ],
  },
];
const eventSeeds = () => Event.bulkCreate(eventdata, { individualHooks: true });

module.exports = eventSeeds;
