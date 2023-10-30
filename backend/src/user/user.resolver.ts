import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { User as UserModel } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserInput, createUserSchema } from './dto/createUser.input';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserModel, { nullable: true })
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async getUser(@Args('email') email: string): Promise<User> {
    return await this.userService.getUser(email);
  }

  @Mutation(() => UserModel)
  @UseGuards(JwtAuthGuard) // tokenが含まれている場合のみ実行される
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    // リゾルバ内でバリデーションを実行
    try {
      const validatedData = createUserSchema.parse(createUserInput);
      return await this.userService.createUser(
        validatedData as CreateUserInput,
      );
    } catch (error) {
      throw new Error(`バリデーションエラー: ${error.message}`);
    }
  }
}
