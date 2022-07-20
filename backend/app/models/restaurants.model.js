module.exports = (sequelize, Sequelize) => {
    const restaurants =  sequelize.define("restaurant", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING
      },
    },{
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: false
    });

    return restaurants;
  };