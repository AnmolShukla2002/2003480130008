import crypto from "crypto";
import jwt from "jsonwebtoken";
const secretKey = "client_PGsiuz";

const users = [
  {
    companyName: "XYZ",
    ownerName: "IT",
    rollNo: "2003480130008",
    ownerEmail: "anmol.28422@gmail.com",
    clientSecret: "0166fa2152058f23b5dea8adb74813c6",
  },
];

const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

export const registerController = (req, res) => {
  try {
    const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;
    const clientId = generateClientIdFromAccessCode(accessCode);
    const clientSecret = generateClientSecretFromAccessCode(accessCode);
    res.status(200).json({
      companyName: companyName,
      clientId: clientId,
      clientSecret: clientSecret,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while registering the user." });
  }
};
function generateClientIdFromAccessCode(accessCode) {
  return `client_${accessCode}`;
}
function generateClientSecretFromAccessCode(accessCode) {
  return generateRandomString(32);
}

export const authenticateCompanyController = (req, res) => {
  try {
    const { companyName, ownerName, rollNo, ownerEmail, clientSecret } =
      req.body;
    const matchingUser = users.find(
      (user) =>
        user.companyName === companyName && user.clientSecret === clientSecret
    );

    if (!matchingUser) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Invalid credentials." });
    }
    const token = jwt.sign(
      {
        companyName: matchingUser.companyName,
        ownerName: matchingUser.ownerName,
        rollNo: matchingUser.rollNo,
        ownerEmail: matchingUser.ownerEmail,
      },
      secretKey,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token_type: "Bearer",
      access_token: token,
      expires_in: 3600,
    });
  } catch (error) {
    console.error("Error authenticating company:", error);
    res
      .status(500)
      .json({ error: "An error occurred while authenticating the company." });
  }
};

const mockTrainData = [
  {
    trainName: "Chennai Exp",
    trainNumber: "2344",
    departureTime: {
      Hours: 21,
      Minutes: 35,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 3,
      AC: 1,
    },
    price: {
      sleeper: 3,
      AC: 1,
    },
    delayedBy: 15,
  },
  {
    trainName: "Hyderabad Exp",
    trainNumber: "2341",
    departureTime: {
      Hours: 23,
      Minutes: 55,
      Seconds: 0,
    },
    seatsAvailable: {
      sleeper: 6,
      AC: 7,
    },
    price: {
      sleeper: 554,
      AC: 1854,
    },
    delayedBy: 5,
  },
];

export const getAllTrains = (req, res) => {
  try {
    const trains = mockTrainData.map((train) => ({
      trainName: train.trainName,
      trainNumber: train.trainNumber,
      departureTime: train.departureTime,
      seatsAvailable: train.seatsAvailable,
      price: train.price,
      delayedBy: train.delayedBy,
    }));

    res.json(trains);
  } catch (error) {
    console.error("Error retrieving trains:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving train data." });
  }
};
