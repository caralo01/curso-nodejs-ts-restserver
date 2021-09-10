import { Request, Response } from "express";
import User from "../models/user";

export const getUsers = async (req: Request, res: Response) => {
  const users = await User.findAll();
  res.json({
    msg: "API - GET USERS",
    users,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (user) {
    res.json({
      msg: "API - GET USER",
      id,
      user,
    });
  } else {
    res.status(404).json({
      msg: `Not found user id: ${id}`,
    });
  }
};

export const postUser = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const existEmail = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (existEmail) {
      return res.status(404).json({
        msg: `Already exist user with email: ${body.email}`,
      });
    }
    const user = await User.create(body);
    res.json({
      msg: "API - POST USER",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: `Error Server`,
    });
  }
};

export const putUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: `Not exist user with id: ${id}`,
      });
    }
    await user.update(body);
    res.json({
      msg: "API - PUT USER",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: `Error Server`,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        msg: `Not exist user with id: ${id}`,
      });
    }
    // Logic
    // await user.update({ state: false });

    // delete in bd
    await user.destroy();
    res.json({
      msg: "API - DElete USER",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: `Error Server`,
    });
  }
};
