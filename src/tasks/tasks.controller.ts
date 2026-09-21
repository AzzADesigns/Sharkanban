import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { Status } from '@prisma/client';
import { TasksService } from './tasks.service.js'; 

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() body: { nameTask: string; descriptionTask: string; userId: string }) {
        return this.tasksService.createTask(body.nameTask, body.descriptionTask, body.userId);
    }

    @Get()
    findAll() {
        return this.tasksService.findAllTasks();
    }

    @Get(':taskId')
    findOne(@Param('taskId') taskId: string) {
        return this.tasksService.findOneTask(taskId);
    }

    @Put(':taskId')
    update(
        @Param('taskId') taskId: string,
        @Body() body: { nameTask?: string; descriptionTask?: string; statusTask?: Status },
    ) {
        return this.tasksService.updateTask(taskId, body);
    }

    @Delete(':taskId')
    delete(@Param('taskId') taskId: string) {
        return this.tasksService.deleteTask(taskId);
    }


}