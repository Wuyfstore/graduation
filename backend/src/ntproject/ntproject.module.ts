import { Module } from '@nestjs/common';
import { NtprojectService } from './services/ntproject.service';
import { AgeService } from './services/age.service';
import { EngService } from './services/eng.service';
import { RockService } from './services/rock.service';
import { HoletypeService } from './services/holetype.service';
import { HistogramService } from './services/histogram.service';
import { BgsyService } from './services/experiment.service';
import { NtprojectController } from './controllers/ntproject.controller';
import { AgeController } from './controllers/age.controller';
import { EngController } from './controllers/eng.controller';
import { RockController } from './controllers/rock.controller';
import { HoletypeController } from './controllers/holetype.controller';
import { HistogramController } from './controllers/histogram.controller';
import { BgsyController } from './controllers/experiment.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Ntproject } from './entities/ntproject.entity';
import { EngineeringGeo } from './entities/engineeringGeo.entity';
import { Histogram } from './entities/histogram.entity';
import { Age } from './entities/ageOfGenesis.entity';
import { HoleType } from './entities/holeType.entity';
import { RockFormation } from './entities/rockFormation.entity';
import { BGSY } from './entities/experimentalStatistics.entity';

@Module({
  // 将实体Ntproject导入使用
  imports: [
    TypeOrmModule.forFeature([
      Ntproject,
      EngineeringGeo,
      HoleType,
      Histogram,
      Age,
      RockFormation,
      BGSY
    ]),
  ],
  controllers: [
    NtprojectController,
    AgeController,
    EngController,
    RockController,
    HoletypeController,
    HistogramController,
    BgsyController
  ],
  providers: [
    NtprojectService,
    AgeService,
    EngService,
    RockService,
    HoletypeService,
    HistogramService,
    BgsyService
  ],
})
export class NtprojectModule {}
