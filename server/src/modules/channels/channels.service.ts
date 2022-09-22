import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {EventsGateway} from '../events/events.gateway'

@Injectable()
export class ChannelsService {
  constructor(
    private eventsGateway:EventsGateway
  ){}

  
}