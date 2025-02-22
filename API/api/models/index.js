const { restart } = require("nodemon");

module.exports = (sequelize, DataTypes) => {
    const Comment = require("./Comment")(sequelize, DataTypes);
    // const Playground = require("./PlayGround")(sequelize, DataTypes);
    // const Shop = require("./Shop")(sequelize, DataTypes);
    // const School = require("./School")(sequelize, DataTypes);
    // const Restaurant = require("./Restaurant")(sequelize, DataTypes);
    const Topic = require("./Topic")(sequelize, DataTypes);
    const User = require("./User")(sequelize, DataTypes);
    const Place = require("./Place")(sequelize, DataTypes);


    //user kapcsolat 
    User.hasMany(Comment, {
        foreignKey: "user_ID",
    });
    Comment.belongsTo(User, {
        foreignKey: "user_ID",
    });


    Place.hasMany(Comment, {
        foreignKey: "place_ID"
    });

    //place-id-s

    // Restaurant.hasMany(Comment, {
    //     foreignKey: "place_ID",
    // });

    // Shop.hasMany(Comment, {
    //     foreignKey: "place_ID",
    // });

    // Playground.hasMany(Comment, {
    //     foreignKey: "place_ID",
    // });

    // School.hasMany(Comment, {
    //     foreignKey: "place_ID",
    // });
    

    // Shop.hasMany(Comment, {
    //     foreignKey: "place_ID",
    // });
    // Comment.hasMany(Shop, {
    //     foreignKey: "place_ID",
    // });

    // School.hasMany(Comment, {
    //     foreignKey: "place_ID",
    // });
    // Comment.hasMany(School, {
    //     foreignKey: "place_ID",
    // });

    // Playground.hasMany(Comment, {
    //     foreignKey: "place_ID",
    // });
    // Comment.hasMany(Playground, {
    //     foreignKey: "place_ID",
    // });

    //topic id-s

    // Topic.hasMany(School, {
    //     foreignKey: "topic_ID",
    // });
    // School.belongsTo(Topic, {
    //     foreignKey: "topic_ID",
    // });

    // Topic.hasMany(Shop, {
    //     foreignKey: "topic_ID",
    // });
    // Shop.belongsTo(Topic, {
    //     foreignKey: "topic_ID",
    // });

    // Topic.hasMany(Playground, {
    //     foreignKey: "topic_ID",
    // });
    // Playground.belongsTo(Topic, {
    //     foreignKey: "topic_ID",
    // });

    // Topic.hasMany(Restaurant, {
    //     foreignKey: "topic_ID",
    // });
    // Restaurant.belongsTo(Topic, {
    //     foreignKey: "topic_ID",
    // });



    return { Comment, User,  Topic,  Place };
};
