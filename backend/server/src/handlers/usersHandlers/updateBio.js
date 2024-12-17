const { isValidObjectId } = require("mongoose");

const User = require("../../database/Models/userModel");

const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;
    const uid = req.session.uid;

    if (!isValidObjectId(uid))
      throw new Error("Invalid ID. Please check the ID and try again.");

    let user = await User.findById(uid);
    if (!user) throw new Error("User not found");

    user.bio = bio;

    // Validates only the modified fields
    user = await user.save({ validateModifiedOnly: true });
    res.status(200).send({ msg: "Bio updated successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = updateBio;
