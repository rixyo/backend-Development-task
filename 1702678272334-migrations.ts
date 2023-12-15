import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1702678272334 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS notes (
        id VARCHAR(36) NOT NULL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS notes`);
  }
}
