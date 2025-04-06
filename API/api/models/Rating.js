module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      user_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users', 
          key: 'id'
        }
      },
      place_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Places', 
          key: 'id'
        }
      },
      rating: {
        type: DataTypes.FLOAT, 
        allowNull: false
      },
      roleWhenRated: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      tableName: 'Ratings', 
      timestamps: false
    });
  
    Rating.associate = (models) => {
      Rating.belongsTo(models.User, { foreignKey: 'user_id' });
      Rating.belongsTo(models.Place, { foreignKey: 'place_id' });
    };
  
    return Rating;
  };
  