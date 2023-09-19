import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';

@Injectable()
export class LinksService {

  private readonly logger = new Logger('links');
 
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>
  ){}

  async create(createLinkDto: CreateLinkDto) {
    try{
      const link = this.linkRepository.create(createLinkDto)
      await this.linkRepository.save( link )
      return link
    }
    catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll() {
    return `This action returns all links`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }

  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }

}
