const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Registration route with validation
app.post(
    "/register",
    [
        body("email")
            .isEmail()
            .withMessage("Invalid email format"),
        body("password")
            .isLength({ min: 6 })
            .withMessage("Password must be at least 6 characters long")
    ],
    (req, res) => {
        const errors = validationResult(req);

        // If validation errors exist
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        res.json({
            message: "User registered successfully",
            data: req.body
        });
    }
);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
