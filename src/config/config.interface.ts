/**
 * Configuration for the database connection.
 */
export interface ConfigDBData {
  url: string;
}

/**
 * Configuration data for the app.
 */
export interface ConfigData {
  /**
   * The name of the environment.
   * @example 'production'
   */
  env: string;

  debug: string;

  port: number;
  /** Database connection details. */
  db: ConfigDBData;

  /**
   * @example 'verbose', 'info', 'warn', 'error'
   */
  logLevel: string;

  /** The New Relic key to use. */
  newRelicKey?: string;
}
