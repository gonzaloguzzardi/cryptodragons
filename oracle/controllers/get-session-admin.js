async function getSessionAdmin(req, res) {
  return res.json({
    success: 'You are authenticated with JWT!',
    user: req.user,
  });
}

module.exports = {
  getSessionAdmin,
};
