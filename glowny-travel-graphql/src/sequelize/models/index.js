import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
//import SeedUserRole from '../models-seed/SeedUserRole'
//import SeedUserShop from '../models-seed/SeedUserShop'
//import SeedProduct from '../models-seed/SeedProduct'
var db = {};
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '../../..', 'config', 'config.json'))[env];
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

/*
var User = db['User']
var Role = db['Role']
var Shop = db['Shop']
var Product = db['Product']
var UserRole = db['User_Role']
var UserShop = db['User_Shop']

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })
User.belongsTo(Shop, { foreignKey: 'shopId' })
Shop.hasMany(User)
Product.belongsTo(Shop, { foreignKey: 'shopId' })
Product.belongsTo(User, { as: 'CreatedUser', foreignKey: 'createdBy' })
Product.belongsTo(User, { as: 'UpdatedUser', foreignKey: 'updatedBy' })
Shop.hasMany(Product)
       */

//User.belongsTo(ShopUser)
//Shop.hasMany(ShopUser)

//SeedUserRole(User, Role, UserRole, env)
//SeedUserShop(db, env)
//SeedProduct(db, env)


module.exports = db
