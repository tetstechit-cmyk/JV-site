import * as migration_20260727_215617_inicial from './20260727_215617_inicial';
import * as migration_20260728_034526_marca from './20260728_034526_marca';
import * as migration_20260728_040118_hero_youtube from './20260728_040118_hero_youtube';
import * as migration_20260728_041053_hero_trecho from './20260728_041053_hero_trecho';

export const migrations = [
  {
    up: migration_20260727_215617_inicial.up,
    down: migration_20260727_215617_inicial.down,
    name: '20260727_215617_inicial',
  },
  {
    up: migration_20260728_034526_marca.up,
    down: migration_20260728_034526_marca.down,
    name: '20260728_034526_marca',
  },
  {
    up: migration_20260728_040118_hero_youtube.up,
    down: migration_20260728_040118_hero_youtube.down,
    name: '20260728_040118_hero_youtube',
  },
  {
    up: migration_20260728_041053_hero_trecho.up,
    down: migration_20260728_041053_hero_trecho.down,
    name: '20260728_041053_hero_trecho'
  },
];
