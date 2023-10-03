import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { fileFilter, fileNamer } from './helpers/';

@Controller('files')
export class FilesController {

  

  @Post('links')
  @UseInterceptors(FileInterceptor('file',{
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/uploads',
      filename: fileNamer
    })
  }))
    uploadLinkImage(
      @UploadedFile()
      file:Express.Multer.File,
    ){

      if ( !file ){
        throw new BadRequestException('Make sure that the file is an image')
      }

      const secureUrl = `${file.filename}`

      return {secureUrl}
    }
 
  

}


