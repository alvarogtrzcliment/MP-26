import type { ImmutableObject } from 'seamless-immutable'

export interface Config {
  exampleConfigProperty: string
  urlWMS: string
}

export type IMConfig = ImmutableObject<Config>
