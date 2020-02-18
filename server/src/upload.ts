import {
    getTokenFromRequest,
    getUserIdFromToken
} from "./auth";
import {User} from "./entity/User";

export const authUploadRequest = async (req: any, res: any, next: any) => {
    const token = getTokenFromRequest(req);
    if (!token) {
        return res.send(401, 'Access denied!');
    }
    const userId = await getUserIdFromToken(token);

    if (!userId) {
        return res.send(401, 'Access denied!');
    }
    const user = await User.findOne(userId);
    if (!user) {
        return res.send(401, 'Access denied!');
    }

    req.currentUser = user;
    next();
};