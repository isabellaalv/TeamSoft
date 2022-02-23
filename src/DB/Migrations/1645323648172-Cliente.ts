import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriarCliente1645323648172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Cliente",
        columns: [
          {
            name: "ID_Cliente",
            type: "integer",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "CNPJ",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "Razao-Social",
            type: "varchar",
          },
          {
            name: "Contato",
            type: "varchar",
          },
          {
            name: "Telefone",
            type: "varchar",
          },
          {
            name: "Criar",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "Atualiza",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Cliente");
  }
}
