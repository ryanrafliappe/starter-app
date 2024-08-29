import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimestampsColumnToRoleTable1724758859581 implements MigrationInterface {
    name = 'AddTimestampsColumnToRoleTable1724758859581'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`roles\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`roles\` DROP COLUMN \`created_at\``);
    }

}
