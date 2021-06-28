const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const consts = require('../common/consts');

module.exports = {
  register: async function (req, res) {
    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        const userModel = new UserModel(req.body);
        user.password = bcrypt.hashSync(req.body.password, consts.bcryptSalts);
        await userModel.save();

        delete user.password;
        res.status(201).json(user);
      } else {
        res.status(403).json({ message: 'Email already register' });
      }
    } catch (e) {
      res
        .status(500)
        .json({ message: 'Error while saving the user', error: e });
    }
  },
};
