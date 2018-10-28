const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./../models/User");
const keys = require("./../config/keys");

module.exports.login = async (req, res) => {
  const candidat = await User.findOne({ email: req.body.email });

  if (candidat) {
    //Користувач існує перевіряємо пароль
    const passwordResult = bcrypt.compareSync(
      req.body.password,
      candidat.password
    );

    if (passwordResult) {
      //Паролі співпали
      const token = jwt.sign({
        email: candidat.email,
        userId: candidat._id
      }, keys.jwt ,{expiresIn: 60*60})

      res.status(200).json({token: `Bearer ${token}`})
    } else {
      //Паролі не підходять
      res.status(401).json({massenge: "Пароль або логін не співпадають"})
    }
  } else {
    // Користувача не існує помилка
    res.status(404).json({
      massenge: "Користувач з такою поштою не найдений!"
    });
  }
};

module.exports.register = async (req, res) => {
  const candidat = await User.findOne({ email: req.body.email });
  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;

  if (candidat) {
    //Якщо кандидат уже існує, вернемо йому помилку
    res.status(409).json({ massenge: "Користувач з таким email уже існує!" });
  } else {
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    });

    try {
      //Це потенційно небезпечний код зато пробуємо виловити помилку бо можуть сервера не робити і таке всяке
      // await ми кажемо почикати доки не виконається код
      await user.save();
      res.status(201).json(user);
    } catch {
      //якщо помилка
    }
  }
};
