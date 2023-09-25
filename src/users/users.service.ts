import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, Link } from 'src/links/entities';
// import { CreateLinkDto } from 'src/links/dto/create-link.dto';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('users')
  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link> 

    ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const {links = [], ...linkDetails } = createUserDto
      const user = this.userRepository.create({
        ...linkDetails,
        links: links.map( link => this.linkRepository.create({
          'image': link.image,
          'label': link.label,
          'link' : link.link, 
        }))
      })
      await this.userRepository.save(user)
      return user
    }
    catch (error){ this.handleDBExceptions(error) }
  }

  findAll() {
    return this.userRepository.find({
      relations:{
        links: true,
      }
    })
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({'userID' : id})
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const row = await this.userRepository.preload({
      'userID' : id,
      ...updateUserDto
    })
    if (!row) throw new NotFoundException(`User with userID: ${id} not found`)

    try{
      return this.userRepository.save(row)
    }
    catch(error) { this.handleDBExceptions (error)}
  }

  async remove(id: string) {
    const product = await this.findOne(id)
    await this.userRepository.remove(product)
  }

  private handleDBExceptions( error: any ) {
    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
