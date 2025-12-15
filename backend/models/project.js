"use strict";

module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    "Project",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      category: {
        type: DataTypes.STRING
      },
      referenceId: {
        type: DataTypes.STRING
      },
      startDate: {
        type: DataTypes.DATEONLY
      },
      locationRaw: {
        type: DataTypes.JSONB,
        allowNull: false
      },
      geom: {
        type: DataTypes.GEOMETRY("GEOMETRY", 4326),
        allowNull: true
      }
    },
    {
      tableName: "projects"
    }
  );

  return Project;
};

