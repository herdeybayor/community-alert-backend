import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { AuthenticatedRequest } from '../authenticated-request/authenticated-request.interface';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { IncidentsService } from './incidents.service';

@Controller('incidents')
@ApiTags('Incidents')
@ApiBearerAuth()
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new incident' })
  @ApiBody({ type: CreateIncidentDto })
  @UseGuards(AccessTokenGuard)
  create(
    @Body() createIncidentDto: CreateIncidentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    console.log(req.user);
    return this.incidentsService.create(createIncidentDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all incidents' })
  findAll() {
    return this.incidentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an incident by ID' })
  findOne(@Param('id') id: string) {
    return this.incidentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an incident by ID' })
  @ApiBody({ type: UpdateIncidentDto })
  update(
    @Param('id') id: string,
    @Body() updateIncidentDto: UpdateIncidentDto,
  ) {
    return this.incidentsService.update(+id, updateIncidentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an incident by ID' })
  remove(@Param('id') id: string) {
    return this.incidentsService.remove(+id);
  }
}
