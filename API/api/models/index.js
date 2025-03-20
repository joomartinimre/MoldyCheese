const { restart } = require("nodemon");


module.exports = (sequelize, DataTypes) => {
    const Comment = require("./Comment")(sequelize, DataTypes);
    const Topic = require("./Topic")(sequelize, DataTypes);
    const User = require("./User")(sequelize, DataTypes);
    const Place = require("./Place")(sequelize, DataTypes);
    const Rating = require("./Rating")(sequelize, DataTypes);
    const RoleRequest = require("./RoleRequests")(sequelize, DataTypes);


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

    User.hasMany(RoleRequest,{
        foreignKey: "user_id"
    })

    RoleRequest.belongsTo(User,{
        foreignKey: "user_id"
    })

   


    return { Comment, User,  Topic,  Place, Rating, RoleRequest };
};
