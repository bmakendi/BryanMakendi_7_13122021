module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pictureUrl: {
        type: DataTypes.STRING,
      },
      job: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0, //0 for false, set it to 1 for true
      },
    },
    {
      scopes: {
        withoutPassword: {
          attributes: { exclude: ['password'] },
        },
      },
      indexes: [{ unique: true, fields: ['email'] }],
    }
  )
  return User
}
