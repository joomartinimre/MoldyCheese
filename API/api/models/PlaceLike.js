module.exports = (sequelize, DataTypes) => {
    const PlaceLike = sequelize.define('PlaceLike', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'ID' // pontosan az adatbázis oszlopnév
        }
      },
      placeId: {
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
      PlaceLike.belongsTo(models.User, { foreignKey: 'userId' });
      PlaceLike.belongsTo(models.Place, { foreignKey: 'placeId' });
    };
  
    return PlaceLike;
  };
  