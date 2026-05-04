import * as migration_20260128_165852_initial_setup from './20260128_165852_initial_setup';
import * as migration_20260225_045604_initial from './20260225_045604_initial';
import * as migration_20260304_030120 from './20260304_030120';
import * as migration_20260307_211719 from './20260307_211719';
import * as migration_20260403_145142 from './20260403_145142';
import * as migration_20260504_032119_template_redesign from './20260504_032119_template_redesign';

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
    name: '20260307_211719',
  },
  {
    up: migration_20260403_145142.up,
    down: migration_20260403_145142.down,
    name: '20260403_145142',
  },
  {
    up: migration_20260504_032119_template_redesign.up,
    down: migration_20260504_032119_template_redesign.down,
    name: '20260504_032119_template_redesign'
  },
];
