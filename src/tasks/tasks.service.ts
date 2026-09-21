import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Status } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async createTask(nameTask: string, descriptionTask: string, userId: string) {
        const newTask = await this.prisma.task.create({
            data: {
                nameTask,
                descriptionTask,
                user: {connect: {userId: userId}},
            }
        });
        return newTask;
    }

    async findAllTasks() {
        const tasks = await this.prisma.task.findMany();
        return tasks;
    }

    async findOneTask(taskId: string) {
        const task = await this.prisma.task.findUnique({
            where: { taskId },
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    async updateTask(
        taskId: string,
        data: { nameTask?: string; descriptionTask?: string; statusTask?: Status },
    ) {
        const updatedTask = await this.prisma.task.update({
            where: { taskId },
            data,
        });
        return updatedTask;
    }

    async deleteTask(taskId: string) {
        const deletedTask = await this.prisma.task.delete({
            where: { taskId },
        });
        return deletedTask;
    }
}