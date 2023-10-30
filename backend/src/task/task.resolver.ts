import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput, createTaskSchema } from './dto/createTask.input';
import { Task } from '@prisma/client';
import { UpdateTaskInput, updateTaskSchema } from './dto/updateTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskModel], { nullable: 'items' })
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async getTasks(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<Task[]> {
    return await this.taskService.getTasks(userId);
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    // リゾルバ内でバリデーションを実行
    try {
      const validatedData = createTaskSchema.parse(createTaskInput);
      return await this.taskService.createTask(
        validatedData as CreateTaskInput,
      );
    } catch (error) {
      throw new Error(`バリデーションエラー: ${error.message}`);
    }
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput,
  ): Promise<Task> {
    // リゾルバ内でバリデーションを実行
    try {
      const validatedData = updateTaskSchema.parse(updateTaskInput);
      return await this.taskService.updateTask(
        validatedData as UpdateTaskInput,
      );
    } catch (error) {
      throw new Error(`バリデーションエラー: ${error.message}`);
    }
  }

  @Mutation(() => TaskModel)
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async deleteTask(
    @Args('deleteTaskInput') deleteTaskInput: DeleteTaskInput,
  ): Promise<Task> {
    // リゾルバ内でバリデーションを実行
    try {
      const validatedData = updateTaskSchema.parse(deleteTaskInput);
      return await this.taskService.deleteTask(
        validatedData as DeleteTaskInput,
      );
    } catch (error) {
      throw new Error(`バリデーションエラー: ${error.message}`);
    }
  }
}
