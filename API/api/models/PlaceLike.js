module.exports = (sequelize, DataTypes) => {
    const PlaceLike = sequelize.define('PlaceLike', {
      user_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'ID' // pontosan az adatbázis oszlopnév
        }
      },
      place_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Places',
          key: 'ID'
        }
      }
    }, {
      tableName: 'PlaceLikes',
      timestamps: false
    });
  
    PlaceLike.associate = (models) => {
      PlaceLike.belongsTo(models.User, { foreignKey: 'user_ID' });
      PlaceLike.belongsTo(models.Place, { foreignKey: 'place_ID' });
    };
  
    return PlaceLike;
  };
  