module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define('Rating', {
      user_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Users', // feltételezzük, hogy a felhasználók táblájának neve 'Users'
          key: 'id'
        }
      },
      place_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Places', // feltételezzük, hogy a helyek táblájának neve 'Places'
          key: 'id'
        }
      },
      rating: {
        type: DataTypes.INTEGER, // itt megadhatod, milyen típusú az értékelés (pl. 1-5 skála esetén INTEGER)
        allowNull: false
      }
    }, {
      tableName: 'Ratings', // a táblanév
      timestamps: false
    });
  
    Rating.associate = (models) => {
      // Kapcsolatok beállítása
      Rating.belongsTo(models.User, { foreignKey: 'user_id' });
      Rating.belongsTo(models.Place, { foreignKey: 'place_id' });
    };
  
    return Rating;
  };
  