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
        foreignKey: 'user_ID'
      });
      PlaceLike.belongsTo(User, {
        foreignKey: 'user_ID'
      });
      
      // Place -> PlaceLike
      Place.hasMany(PlaceLike, {
        foreignKey: 'place_ID'
      });
      PlaceLike.belongsTo(Place, {
        foreignKey: 'place_ID'
      });

      User.hasMany(CommentLike, {
        foreignKey: 'user_ID'
      });
      CommentLike.belongsTo(User, {
        foreignKey: 'user_ID'
      });
      
      // Comment -> CommentLike
      Comment.hasMany(CommentLike, {
        foreignKey: 'comment_ID'
      });
      CommentLike.belongsTo(Comment, {
        foreignKey: 'comment_ID'
      });
   


    return { Comment, User,  Topic,  Place, Rating, RoleRequest, PlaceLike, CommentLike };
};
