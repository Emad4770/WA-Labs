import db from "./db.mjs";
import crypto from "crypto";

export const getUser = (username, password) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
        db.get(sql, [username, password], (err, row) => {
            if (err) reject(err);
            else if (row === undefined)
                resolve({ error: "No user found with the given credentials!" });
            else {
                const user = { id: row.id, username: row.email, name: row.name };
                crypto.scrypt(password, row.salt, 32, (err, hashedPassword) => {
                    if (err) reject(err);
                    else {
                        if (crypto.timingSafeEqual(Buffer.from(row.hash, 'hex'), hashedPassword)) {
                            resolve(user);
                        }
                        else
                            resolve(false)
                    }
                }
                );
            }
        });
    });
}