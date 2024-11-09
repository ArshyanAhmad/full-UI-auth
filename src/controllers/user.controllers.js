export const Register = (req, res) => {
  res.send("Hello");
};

export const Login = (req, res) => {
  const { name, email } = req.body;
  console.log(name);
  console.log(email);

  res.render("index");
};
