import { 
  Get, 
  Controller, 
  Render, 
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(): Object {
    return this.appService.root();
  }
}
