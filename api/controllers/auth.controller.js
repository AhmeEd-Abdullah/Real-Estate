import prisma from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import appError from '../utilities/globalError.js';
import httpStatusText from '../utilities/httpStatusText.js';


export const registerController = async (req, res, next) => {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            email,
            username,
            password: hashedPassword
        }
    });
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
    }
    );
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!user) next(appError.create(httpStatusText.fail, 404, 'User not found'))


    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) next(appError.create(httpStatusText.fail, 400, 'Invalid Credentials'))

    const age = 1000 * 60 * 60 * 24 * 7; // 1 Week
    const { password: userPassword, ...userInfo } = user;
    const token = jwt.sign(
        userInfo
        , process.env.JWT_SECRET_KEY,
        {
            expiresIn: age
        });

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: age
        // secure: true,
    }).status(200).json({
        success: true,
        message: "Loggedin successfully",
        data: userInfo
    }
    )
};

export const logoutController = (req, res) => {
    res.clearCookie("token").status(200).json({
        success: true,
        message: "Logout Successfully",
    })
};