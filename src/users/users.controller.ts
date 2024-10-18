import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { DeleteResult } from 'typeorm';
import { updateUserDto } from './dto/uptade-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }
  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }
  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.userService.getUser(id);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.userService.deleteUser(id);
  }
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: updateUserDto,
  ) {
    return this.userService.updateUser(id, user);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto,
  ) {
    return this.userService.createProfile(id, profile);
  }
}
