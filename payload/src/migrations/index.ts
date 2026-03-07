import * as migration_20260128_165852_initial_setup from './20260128_165852_initial_setup';
import * as migration_20260225_045604_initial from './20260225_045604_initial';
import * as migration_20260304_030120 from './20260304_030120';
import * as migration_20260307_211719 from './20260307_211719';

export const migrations = [
  {
    up: migration_20260128_165852_initial_setup.up,
    down: migration_20260128_165852_initial_setup.down,
    name: '20260128_165852_initial_setup',
  },
  {
    up: migration_20260225_045604_initial.up,
    down: migration_20260225_045604_initial.down,
    name: '20260225_045604_initial',
  },
  {
    up: migration_20260304_030120.up,
    down: migration_20260304_030120.down,
    name: '20260304_030120',
  },
  {
    up: migration_20260307_211719.up,
    down: migration_20260307_211719.down,
    name: '20260307_211719'
  },
];
