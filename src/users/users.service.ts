import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/links/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  
  private readonly logger = new Logger('users')

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const user = this.userRepository.create(createUserDto)
      await this.userRepository.save(user)
      return user
    }
    catch(error){this.handleDBExceptions(error)}
  }

  findAll() {
    return this.userRepository.find({})
  }

  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userRepository.findOneBy({'userID': id})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const row = await this.userRepository.preload({
      'userID': id,
      ...updateUserDto
    })

    if ( !row ) throw new NotFoundException(`User with idUser: ${id} not found`)

    try{
      return this.userRepository.save(row)
    }
    catch (error) {this.handleDBExceptions(error)}

  }

  async remove( @Param('id', ParseUUIDPipe) id: string ) {
    const row = await this.findOne(id)
    await this.userRepository.remove(row)
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
