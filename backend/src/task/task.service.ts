import { Injectable } from '@nestjs/common';
// import { Task } from './models/task.model';
import { CreateTaskInput } from './dto/createTask.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Task } from '@prisma/client';
import { UpdateTaskInput } from './dto/updateTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}
  tasks: Task[] = [];

  // prismaClientのtask型を定義
  async getTasks(userId: number): Promise<Task[]> {
    return await this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
  }

  async createTask(createTaskInput: CreateTaskInput): Promise<Task> {
    const { name, dueDate, description, userId } = createTaskInput;

    return await this.prismaService.task.create({
      data: {
        name,
        dueDate,
        description,
        userId,
      },
    });
  }

  async updateTask(updateTaskInput: UpdateTaskInput): Promise<Task> {
    const { id, name, dueDate, description } = updateTaskInput;

    return await this.prismaService.task.update({
      where: { id },
      data: {
        name,
        dueDate,
        description,
      },
    });
  }

  async deleteTask(deleteTaskInput: DeleteTaskInput): Promise<Task> {
    const { id } = deleteTaskInput;
    return await this.prismaService.task.delete({
      where: { id },
    });
  }
}
