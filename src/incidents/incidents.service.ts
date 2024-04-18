import { Injectable } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incident } from './entities/incident.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class IncidentsService {
  constructor(
    @InjectRepository(Incident)
    private readonly incidentRepository: Repository<Incident>,
    private readonly usersService: UsersService,
  ) {}

  async create(createIncidentDto: CreateIncidentDto, userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new EntityNotFoundError(UsersService, userId);
    }
    let location = null;
    if (createIncidentDto.location) {
      location = createIncidentDto.location.split(',').map(Number);
    }
    return this.incidentRepository.save({
      ...createIncidentDto,
      location: location ? { type: 'Point', coordinates: location } : null,
      user,
    });
  }

  findAll() {
    return this.incidentRepository.find();
  }

  findOne(id: number) {
    return this.incidentRepository.findOneBy({ id });
  }

  update(id: number, updateIncidentDto: UpdateIncidentDto) {
    let location = null;
    if (updateIncidentDto.location) {
      location = updateIncidentDto.location.split(',').map(Number);
    }
    return this.incidentRepository.update(id, {
      ...updateIncidentDto,
      ...(location && { location: { type: 'Point', coordinates: location } }),
    });
  }

  remove(id: number) {
    return this.incidentRepository.delete(id);
  }
}
