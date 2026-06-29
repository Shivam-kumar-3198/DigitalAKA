import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { RolesService } from '../../modules/roles/roles.service';
import { PermissionsService } from '../../modules/permissions/permissions.service';
import { Logger } from '@common/logger/logger.service';

@Injectable()
export class InitialSeedService implements OnApplicationBootstrap {
  constructor(
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    private logger: Logger,
  ) {}

  async onApplicationBootstrap() {
    try {
      this.logger.log(
        'Starting database seeding...',
        'InitialSeedService',
      );

      // Seed permissions first
      await this.permissionsService.seedSystemPermissions();

      // Then seed roles
      await this.rolesService.seedSystemRoles();

      this.logger.log(
        'Database seeding completed successfully',
        'InitialSeedService',
      );
    } catch (error) {
      this.logger.error(
        'Database seeding failed',
        error.stack,
        'InitialSeedService',
      );
    }
  }
}
