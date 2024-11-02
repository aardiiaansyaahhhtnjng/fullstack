import Users from "../models/UserModel.js"
import argon2 from "argon2"
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'pass', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'pass', 'role'],
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {
    const {name, email, password, confPassword, role} =  req.body;
    if (password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create ({
            name: name,
            email: email,
            pass: password,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "register berhasil"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "user tidak ditemukan"})
    const {name, email, password, confPassword, role} =  req.body;
    let hashPassword;
    if(password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    try {
        await Users.update ({
            name: name,
            email: email,
            pass: password,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "user updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "user tidak ditemukan"})
    try {
        await Users.destroy ({
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "user deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }   
}

export const searchUser = async (req, res) => {
    const page = parseInt (req.query.page) || 0;
    const limit = parseInt (req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;
    const totalRows = await Users.count({
        where: {
            [Op.or]: [{name: {
                [Op.like]: '%'+search+'%'
            }}, {email: {
                [Op.like]: '%'+search+'%'
            }}]
        }
    });

    const totalPage = Math.ceil(totalRows/limit);
    const result = await Users.findAll({
        where: {
            [Op.or]: [{name:{
                [Op.like]: '%'+search+'%'
            }}]
        },
        offset: offset,
        limit: limit,
        order: [
            ['id', 'DESC']
        ]
    });
    res.json({
        result: result,
        page: page,
        limit: limit,
        totalRows: totalRows,
        totalPage: totalPage
    })
}