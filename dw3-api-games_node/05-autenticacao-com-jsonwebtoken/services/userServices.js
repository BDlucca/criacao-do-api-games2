// importando model
import User from "../models/Users.js";

class userServices {
  // metodo para cadastrar usuario
  async Create(name, email, password) {
    try {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
    } catch (error) {
      console.log(error);
    }
  }
  //metodo para buscar um usuario
  async getOne(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new userServices();
