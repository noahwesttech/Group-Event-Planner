const { Item } = require("../models");

const itemData = [
    {
        event_id: 1,
        user_id: 1, 
        item_name: "Potato chips",
    },
    {
        event_id: 2,
        user_id: 2, 
        item_name: "Soda",
    },
    {
        event_id: 3,
        user_id: 3, 
        item_name: "Cookies",
    },
    {
        event_id: 4,
        user_id: 4, 
        item_name: "Napkins",
    },
    {
        event_id: 5,
        user_id: 5, 
        item_name: "Hotdogs",
    },
    {
        event_id: 5,
        user_id: 1, 
        item_name: "Hotdog buns",
    },
    {
        event_id: 4,
        user_id: 2, 
        item_name: "Potato chips",
    },
    {
        event_id: 3,
        user_id: 3, 
        item_name: "Condiments",
    },
    {
        event_id: 2,
        user_id: 4, 
        item_name: "THA BOOZE",
    },
    {
        event_id: 1,
        user_id: 5, 
        item_name: "Brownies",
    },
];

const itemSeeds = () => Item.bulkCreate(itemData, { individualHooks: true });

module.exports = itemSeeds;