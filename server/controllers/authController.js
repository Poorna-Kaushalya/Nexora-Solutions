const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const exists = await User.findOne({ email });

        if (exists) {

            return res.status(400).json({

                success: false,

                message: "Email already exists"

            });

        }

        const user = await User.create({

            name,
            email,
            password

        });

        res.status(201).json({

            success: true,

            token: generateToken(user._id),

            user

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {

            return res.status(401).json({

                success: false,

                message: "Invalid Email"

            });

        }

        const match = await user.matchPassword(password);

        if (!match) {

            return res.status(401).json({

                success: false,

                message: "Wrong Password"

            });

        }

        res.json({

            success: true,

            token: generateToken(user._id),

            user

        });

    }

    catch (err) {

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

};

const profile = async (req, res) => {

    res.json({

        success: true,

        user: req.user

    });

};

module.exports = {

    register,

    login,

    profile

};