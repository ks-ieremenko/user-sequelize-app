import express, { Request, Response } from 'express';

import { badRequest, notFound, ok } from '../common/constants';
import { PermissionAttributes } from './permission.interfaces';
import Permission from './permission.model';
import {
  createPermission,
  deletePermission,
  getPermissions,
} from './permission.service';

export class PermissionController {
  static async read(request: Request, response: Response): Promise<void> {
    try {
      const permissionIds: Permission[] = await getPermissions();
      response.status(ok).send(permissionIds);
    } catch (error: any) {
      response.status(notFound).send(error.message);
    }
  }

  static async create(request: Request, response: Response): Promise<void> {
    const name: string = request.body.name;
    if (!name) {
      response.status(badRequest).send('Field "name" required');
    }
    try {
      await createPermission(name);
      response.status(ok).send('Permission is created');
    } catch (error: any) {
      response.status(badRequest).send(error.message);
    }
  }

  static async delete(request: Request, response: Response): Promise<void> {
    const permissionUuid = request.body.permissionUuid;
    if (!permissionUuid) {
      response.status(badRequest).send('Field "permissionUuid" required');
    }
    try {
      await deletePermission(permissionUuid);
      response.status(ok).send('Permission deleted');
    } catch (error: any) {
      response.status(badRequest).send(error.message);
    }
  }
}

export default PermissionController;
