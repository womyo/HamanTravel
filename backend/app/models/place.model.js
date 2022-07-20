module.exports = (sequelize, Sequelize) => {
    const place =  sequelize.define("place", {
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
      keyword: {
        type: Sequelize.STRING
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      }
    },{
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: false
    });

    return place;
  };