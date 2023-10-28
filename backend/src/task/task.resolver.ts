import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task as TaskModel } from './models/task.model';
import { CreateTaskInput, createTaskSchema } from './dto/createTask.input';
import { Task } from '@prisma/client';
import { UpdateTaskInput, updateTaskSchema } from './dto/updateTask.input';
import { DeleteTaskInput } from './dto/deleteTask.input';

@Resolver()
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => [TaskModel], { nullable: 'items' })
  async getTasks(@Args('userId') userId: number): Promise<Task[]> {
    return await this.taskService.getTasks(userId);
  }

  @Mutation(() => TaskModel)
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
