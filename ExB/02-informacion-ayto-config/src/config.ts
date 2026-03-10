import type { ImmutableObject } from 'seamless-immutable'

export interface Config {
  nombre: string,
  foto: URL
}

export type IMConfig = ImmutableObject<Config>
