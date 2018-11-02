import { 
  Module, 
  HttpModule, 
} from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class OrderbookModule { }
