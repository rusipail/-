import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import {ChannelsService} from './channels.service'
import {EventsModule} from '../events/events.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    EventsModule
  ],
  controllers: [],
  providers: [ChannelsService]
})
export class ChannelsModule {}