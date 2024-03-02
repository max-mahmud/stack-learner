const authService = require('../../../lib/auth');
const { generateToken } = require('../../../lib/token');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await authService.register({ name, email, password });
    // generate access token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    console.log('payload', payload);
    const accessToken = generateToken({ payload });

    // response
    const response = {
      code: 201,
      message: 'User created successfully',
      data: {
        access_token: accessToken,
      },
      links: {
        self: req.url,
        login: '/auth/login',
      },
    };

    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};


const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const accessToken = await authService.login({ email, password });

    const response = {
      code: 200,
      message: 'User authenticated successfully',
      data: {
        access_token: accessToken,
      },
      links: {
        self: "/auth/signin",
        "profile": "/user/profile"
      },
    };
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = { login, register };