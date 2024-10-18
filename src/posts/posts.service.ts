import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async create(post: CreatePostDto) {
    const userFound = await this.usersService.getUser(post.authorId);
    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const newPost = this.postsRepository.create(post);
    return this.postsRepository.save(newPost);
  }

  findAll() {
    return this.postsRepository.find({
      relations: ['author'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
