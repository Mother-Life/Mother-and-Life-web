import * as migration_20261020_165822_initial from './20261020_165822_initial';
import * as migration_20261020_184004_securite_payload_3_91 from './20261020_184004_securite_payload_3_91';

export const migrations = [
  {
    up: migration_20261020_165822_initial.up,
    down: migration_20261020_165822_initial.down,
    name: '20261020_165822_initial',
  },
  {
    up: migration_20261020_184004_securite_payload_3_91.up,
    down: migration_20261020_184004_securite_payload_3_91.down,
    name: '20261020_184004_securite_payload_3_91'
  },
];
