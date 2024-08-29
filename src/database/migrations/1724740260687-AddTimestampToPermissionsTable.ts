import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimestampToPermissionsTable1724740260687 implements MigrationInterface {
    name = 'AddTimestampToPermissionsTable1724740260687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`permissions\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`permissions\` DROP COLUMN \`created_at\``);
    }

}
