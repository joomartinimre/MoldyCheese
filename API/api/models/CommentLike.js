module.exports = (sequelize, DataTypes) => {
    const CommentLike = sequelize.define('CommentLike', {
      user_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'ID' 
        }
      },
      comment_ID: {
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
        CommentLike.belongsTo(models.User, { foreignKey: 'user_ID' });
        CommentLike.belongsTo(models.Comment, { foreignKey: 'comment_ID' });
    };
  
    return CommentLike;
  };
  