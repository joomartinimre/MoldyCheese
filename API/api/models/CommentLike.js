module.exports = (sequelize, DataTypes) => {
    const CommentLike = sequelize.define('CommentLike', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'ID' 
        }
      },
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Comments',
          key: 'ID'
        }
      }
    }, {
      tableName: 'CommentLikes',
      timestamps: false
    });
  
    CommentLike.associate = (models) => {
        CommentLike.belongsTo(models.User, { foreignKey: 'userId' });
        CommentLike.belongsTo(models.Place, { foreignKey: 'placeId' });
    };
  
    return CommentLike;
  };
  