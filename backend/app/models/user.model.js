module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
    return User;
  };