import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1724663245256 implements MigrationInterface {
    name = 'InitialMigration1724663245256'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_has_roles\` (\`user_id\` varchar(36) NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_d2b980baf026ff8347d88ace6e\` (\`user_id\`), INDEX \`IDX_386dc0042695c976845d36be94\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_has_permissions\` (\`role_id\` int NOT NULL, \`permission_id\` int NOT NULL, INDEX \`IDX_2ae558c5fda877f068bf7a6b87\` (\`role_id\`), INDEX \`IDX_f9cde1fc9ba1b624e4862652e4\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_d2b980baf026ff8347d88ace6ee\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_386dc0042695c976845d36be948\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_has_permissions\` ADD CONSTRAINT \`FK_2ae558c5fda877f068bf7a6b877\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_has_permissions\` ADD CONSTRAINT \`FK_f9cde1fc9ba1b624e4862652e48\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_has_permissions\` DROP FOREIGN KEY \`FK_f9cde1fc9ba1b624e4862652e48\``);
        await queryRunner.query(`ALTER TABLE \`roles_has_permissions\` DROP FOREIGN KEY \`FK_2ae558c5fda877f068bf7a6b877\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_386dc0042695c976845d36be948\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_d2b980baf026ff8347d88ace6ee\``);
        await queryRunner.query(`DROP INDEX \`IDX_f9cde1fc9ba1b624e4862652e4\` ON \`roles_has_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_2ae558c5fda877f068bf7a6b87\` ON \`roles_has_permissions\``);
        await queryRunner.query(`DROP TABLE \`roles_has_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_386dc0042695c976845d36be94\` ON \`user_has_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_d2b980baf026ff8347d88ace6e\` ON \`user_has_roles\``);
        await queryRunner.query(`DROP TABLE \`user_has_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
