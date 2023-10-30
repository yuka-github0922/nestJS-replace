import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService],
  exports: [UserService], // 認証を行う際にユーザー情報を取得するために必要
})
export class UserModule {}
