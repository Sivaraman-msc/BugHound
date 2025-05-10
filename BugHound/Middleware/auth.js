const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cookieParser());

const JWT_KEY = process.env.JWT_KEY;
 
exports.Auth = (req, res, next) => {
  const token = req.cookies.token;

  if (!req.cookies || !req.cookies.token) {
    return res.status(401).json({ message: "Access denied: No token found" });
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("Authenticated user:", decoded); 

    req.user = decoded; 
    next();
  });
};
