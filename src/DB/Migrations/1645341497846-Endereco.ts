import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Endereco1645341497846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Endereco",
        columns: [
          {
            name: "ID_endereco",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "Local",
            type: "varchar",
          },
          {
            name: "Numero",
            type: "integer",
          },
          {
            name: "Complemento",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "Bairro",
            type: "varchar",
          },
          {
            name: "Cidade",
            type: "varchar",
          },
          {
            name: "Estado",
            type: "varchar",
          },
          {
            name: "CEP",
            type: "varchar",
          },
          {
            name: "CREATED_AT",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "UPDATEd_AT",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Endereco");
  }
}
