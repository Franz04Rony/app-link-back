import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { UserLink } from './entities/userLink.entity';
import { CreateUserLinkDto } from './dto/create-userLink.dto';

@Injectable()
export class LinksService {

  private readonly logger = new Logger('links');
 
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
    
    @InjectRepository(UserLink)
    private readonly userLinkRepository: Repository<UserLink>
  ){}

  async create(createLinkDto: CreateLinkDto) {
    try{

      const link = this.linkRepository.create(createLinkDto)
      await this.linkRepository.save( link )

      const userLink = this.userLinkRepository.create({
        userRef: createLinkDto.userID,
        idRef: link.idLink
      })
      await this.userLinkRepository.save(userLink)

      return userLink
    }
    catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll() {
    return this.linkRepository.find({})
  }

  findOne( @Param('id', ParseUUIDPipe) id: string) {
    return this.linkRepository.findOneBy({ 'idLink': id })
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    
    const row = await this.linkRepository.preload({
      'idLink': id,
      ...updateLinkDto
    })

    if ( !row ) throw new NotFoundException(`Link with idLink: ${id} not found`)

    try{
      return this.linkRepository.save(row)
    }
    catch(error){
      this.handleDBExceptions(error)
    }
  }

  async remove( @Param('id', ParseUUIDPipe) id: string) {
    const row = await this.findOne(id)
    await this.linkRepository.remove(row)
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
