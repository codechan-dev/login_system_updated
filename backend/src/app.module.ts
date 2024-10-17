import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath:['.env']
  }),
   TypeOrmModule.forRoot({
    type:'mysql',
    host:"localhost",
    port:3306,
    username:"root" ,
    password:'',
    database:"auth_db",
    synchronize: true,
    entities: [User],
    autoLoadEntities: true
   }),
   UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
