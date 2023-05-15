const bcrypt = require('bcryptjs')

const generateRandomString = (myLength) => {
    const chars =
        "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
        { length: myLength },
        (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
};

const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt)

    return password
}

module.exports = { generateRandomString, encryptPassword }