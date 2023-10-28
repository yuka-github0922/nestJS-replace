import { Field, InputType, Int } from '@nestjs/graphql';
import { Status } from '@prisma/client';
import { isDateString, nonEmptyString } from 'src/utils/validation';
import { z } from 'zod';

// Zodスキーマの定義
export const updateTaskSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().refine(nonEmptyString).optional(),
  dueDate: z.string().refine(isDateString).optional(),
  status: z
    .enum([Status.DONE, Status.IN_PROGRESS, Status.NOT_STARTED])
    .optional(),
  description: z.string().max(100).optional(),
});

// classをmutationの引数に指定するには必要
@InputType()
export class UpdateTaskInput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true }) // Objectには必要
  name: string;

  @Field({ nullable: true })
  dueDate: string;

  @Field({ nullable: true })
  status: Status;

  @Field({ nullable: true })
  description?: string;
}
