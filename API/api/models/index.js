const { restart } = require("nodemon");


module.exports = (sequelize, DataTypes) => {
    const Comment = require("./Comment")(sequelize, DataTypes);
    const Topic = require("./Topic")(sequelize, DataTypes);
    const User = require("./User")(sequelize, DataTypes);
    const Place = require("./Place")(sequelize, DataTypes);
    const Rating = require("./Rating")(sequelize, DataTypes);
    const RoleRequest = require("./RoleRequests")(sequelize, DataTypes);
    const PlaceLike = require("./PlaceLike")(sequelize, DataTypes);
    const CommentLike = require("./CommentLike")(sequelize, DataTypes);


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


    User.hasMany(PlaceLike, {
        foreignKey: 'userId'
      });
      PlaceLike.belongsTo(User, {
        foreignKey: 'userId'
      });
      
      // Place -> PlaceLike
      Place.hasMany(PlaceLike, {
        foreignKey: 'placeId'
      });
      PlaceLike.belongsTo(Place, {
        foreignKey: 'placeId'
      });

      User.hasMany(CommentLike, {
        foreignKey: 'userId'
      });
      CommentLike.belongsTo(User, {
        foreignKey: 'userId'
      });
      
      // Comment -> CommentLike
      Comment.hasMany(CommentLike, {
        foreignKey: 'commentId'
      });
      CommentLike.belongsTo(Comment, {
        foreignKey: 'commentId'
      });
   


    return { Comment, User,  Topic,  Place, Rating, RoleRequest, PlaceLike, CommentLike };
};
