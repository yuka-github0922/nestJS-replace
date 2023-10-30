import { Field, InputType } from '@nestjs/graphql';

@InputType() // Mutationの引数となるように
export class SignInInput {
  @Field()
  email: string;
  @Field()
  password: string;
}
