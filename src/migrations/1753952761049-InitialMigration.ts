import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1753952761049 implements MigrationInterface {
    name = 'InitialMigration1753952761049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`image_file\` \`image_file\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`projects\` CHANGE \`image_file\` \`image_file\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}
