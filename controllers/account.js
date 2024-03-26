const getAllAccounts = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: 'getAllAccounts'
    });
  } catch (error) {
    console.error(error);
  }
}
module.exports = { getAllAccounts };
