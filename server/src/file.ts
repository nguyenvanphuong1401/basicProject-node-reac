import { Request, Response } from "express";
import path from 'path'
import fileSystem from 'fs'
import { Attachment } from "./entity/Attachment";
import * as jwt from "jsonwebtoken";
import moment from 'moment';
import { getUserIdFromRequest } from "./auth";
import { User } from "./entity/User";
import { URL } from "./config";

const key = 'jwt-file-service-key';


/**
 * Handle upload file success
 * @param req
 * @param response
 */
export const fileUploadSuccessHandler = async (req: Request, response: Response) => {
    const file = req.file;
    if (!file) {
        response.status(404);
        response.send('No file upload found!');
    }

    const userId = await getUserIdFromRequest(req);
    const user = await User.findOne(userId);
    if (!user) {
        response.status(401);
        response.send('Access denied!');
        return
    }


    const attachment = new Attachment();
    attachment.name = file.filename;
    attachment.originalName = file.originalname;
    attachment.contentType = file.mimetype;
    attachment.size = file.size;
    attachment.author = user;
    attachment.created = new Date();
    await attachment.save();

    attachment.url = await generateFileUrl(attachment.name, moment().add('1', 'day').unix());
    response.json(attachment)
};

/**
 * Handle file view
 * @param req
 * @param response
 */
export const fileHandler = async (req: Request, response: Response) => {
    const name = req.params.name;
    const key = req.query.key;
    const filename = await validateFileToken(key);
    if (!key || !filename) {
        response.status(401);
        response.send("Access denied!");
        return
    }
    const attachment = await Attachment.findOne({ where: { name } });
    if (!attachment) {
        response.status(404);
        response.send('File not found!');
        return
    }
    const filePath = path.join(`./storage/${name}`);
    const stat = fileSystem.statSync(filePath);
    response.writeHead(200, {
        'Content-Type': attachment.contentType,
        'Content-Length': stat.size
    });
    const readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(response);
};

/**
 * Generate file preview url
 * @param fileName
 * @param expiredIn
 */
export const generateFileUrl = (fileName: string, expiredIn: number): string => {
    const token = jwt.sign({ file: fileName }, key, {
        expiresIn: expiredIn,
    });
    return `${URL}/file/${fileName}?key=${token}`
};

/**
 * Validate file token /file/:name?key=abc
 * @param token
 */
export const validateFileToken = async (token: string): Promise<string> => {
    return await new Promise((resolve) => {
        jwt.verify(token, key, function (err, payload: any) {
            if (err) {
                resolve("");
            }
            return resolve(payload.file);
        })

    });

};

/**
 * @param req
 * @param response
 */
export const fileRemove = async (req: Request, response: Response) => {
    const attachment = await Attachment.findOneOrFail(req.params.id);
    if(attachment) {
        const Path = path.join(`./storage/${attachment.name}`);
        await fileSystem.unlinkSync(Path)
        await attachment.remove();
        response.end("Delete Complete!")
    } else {
        response.status(404);
        response.send("File not found!")
        return
    }
};