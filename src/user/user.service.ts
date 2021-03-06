import User from './user.model';
import { v4 as uuidv4 } from 'uuid';
import Role from '../role/role.model';

export const getUsers = async (): Promise<User[]> => {
    const users = await User.findAll({ include: Role });
    if (!users.length) {
        throw new Error('No users were found');
    }
    return users;
};

export const getUser = async (uuid: string): Promise<User> => {
    const user = await User.findByPk(uuid, { include: Role });
    if (!user) {
        throw new Error('No users were found');
    }
    return user;
};
export const isUserAdmin = async (user: User): Promise<boolean> => {
    if (!user || user.role.name !== 'Admin') {
        // throw new Error('No admin');
        return false;
    }
    return true;
};
export const createUser = async (
    name: string,
    email: string
): Promise<void> => {
    const userExist: User = await User.findOne({
        where: {
            email,
        },
    });
    if (userExist) {
        throw new Error('User already exists');
    }
    await User.create({
        uuid: uuidv4(),
        name,
        email,
    });
};
export const addRoleForUser = async (
    userUuid: string,
    roleUuid: string
): Promise<void> => {
    const user: User = await User.findByPk(userUuid);
    const role: Role = await Role.findByPk(roleUuid);
    if (!user || !role) {
        throw new Error('User or role not found');
    }
    //@ts-ignore
    await user.setRole(role);
};
