const CheckAuth = (token) => {
  const decodedToken = jwt.verify(token, process.env.JWT_KEY);
  const userId = decodedToken.userId;
  if (req.body.userId && req.body.userId !== userId) {
    throw "Invalid user ID";
  } else {
    next();
  }
};
