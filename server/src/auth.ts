import * as jwt from "jsonwebtoken";
import * as express from "express";

const key = "WiX0torZDWZXrus8LCE9urAjZomQEasQ";

export const jwtSign = (userId: number, expiredIn: number): string => {
    return jwt.sign({userId}, key, {
        expiresIn: expiredIn,
    });
};


export const getUserIdFromRequest = async (req: express.Request): Promise<number> => {
    const token = getTokenFromRequest(req);
    return getUserIdFromToken(token);
};

export const getTokenFromRequest = (req: express.Request) => {
    let token = req.headers.authorization || '';
    if (token != "") {
        token = token.split(" ")[1];
    }
    return token
};

export const getUserIdFromToken = (token: string): Promise<number> => {

    return new Promise((resolve) => {
        jwt.verify(token, key, function (err, payload: any) {
            if (err) {
                resolve(0);
            }
            return resolve(payload.userId);
        })

    })

};