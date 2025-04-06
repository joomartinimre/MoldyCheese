const db = require("../database/dbContext");
const User = db.User;

const getAllUsers = async () => {
    const users = await User.findAll({
      attributes: ["ID", "userName", "role"],
      where: {
        role: {
          [db.Sequelize.Op.ne]: "Admin", 
        }
      },
      order: [["userName", "ASC"]],
      raw: true
    });
  
    return users;
  };

const promoteToAdmin = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("Felhasználó nem található.");

  user.role = "Admin";
  await user.save();

  return { message: `Felhasználó (${user.userName}) adminná lett téve.` };
};

const demoteToUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("Felhasználó nem található.");

  user.role = "User";
  await user.save();

  return { message: `Felhasználó (${user.userName}) szerepe visszaállítva User-re.` };
};

module.exports = {
  getAllUsers,
  promoteToAdmin,
  demoteToUser
};
