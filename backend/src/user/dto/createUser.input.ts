import { Field, InputType } from '@nestjs/graphql';
import { nonEmptyString } from 'src/utils/validation';
import { z } from 'zod';

// Zodスキーマの定義
export const createUserSchema = z.object({
  name: z.string().refine(nonEmptyString),
  email: z.string(),
  password: z.string().min(8),
});

// classをmutationの引数に指定するには必要
@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
