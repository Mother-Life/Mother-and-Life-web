import * as migration_20261020_165822_initial from './20261020_165822_initial';

export const migrations = [
  {
    up: migration_20261020_165822_initial.up,
    down: migration_20261020_165822_initial.down,
    name: '20261020_165822_initial'
  },
];
