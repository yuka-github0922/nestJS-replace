import { Field, InputType, Int } from '@nestjs/graphql';
import { isDateString, nonEmptyString } from 'src/utils/validation';
import { z } from 'zod';

// Zodスキーマの定義
export const createTaskSchema = z.object({
  userId: z.number().int().positive(),
  name: z.string().refine(nonEmptyString),
  dueDate: z.string().refine(isDateString),
  description: z.string().max(100).optional(),
});

// classをmutationの引数に指定するには必要
@InputType()
export class CreateTaskInput {
  @Field() // Objectには必要
  name: string;

  @Field()
  dueDate: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  userId: number;
}
