import { Field, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';

// Zodスキーマの定義
export const deleteTaskSchema = z.object({
  id: z.number().int().positive(),
});

// classをmutationの引数に指定するには必要
@InputType()
export class DeleteTaskInput {
  @Field(() => Int)
  id: number;
}
