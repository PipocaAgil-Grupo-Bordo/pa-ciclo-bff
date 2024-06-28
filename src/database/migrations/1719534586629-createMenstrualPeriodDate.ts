import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMenstrualPeriodDate1719534586629 implements MigrationInterface {
    name = 'CreateMenstrualPeriodDate1719534586629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "menstrual_period_date" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "date" date NOT NULL, "menstrualPeriodId" integer NOT NULL, CONSTRAINT "PK_996af91a3ae642dff49168f4f60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "menstrual_period" ADD "lastDate" date`);
        await queryRunner.query(`ALTER TABLE "menstrual_period_date" ADD CONSTRAINT "FK_2ca120b67d8b2d36bf3f76d79e1" FOREIGN KEY ("menstrualPeriodId") REFERENCES "menstrual_period"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "menstrual_period_date" DROP CONSTRAINT "FK_2ca120b67d8b2d36bf3f76d79e1"`);
        await queryRunner.query(`ALTER TABLE "menstrual_period" DROP COLUMN "lastDate"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`DROP TABLE "menstrual_period_date"`);
    }

}
