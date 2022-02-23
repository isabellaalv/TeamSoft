import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class ForeignKeyTable1645385936574
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // adds column in the table
    await queryRunner.addColumn(
      "address",
      new TableColumn({
        name: "Cliente_Id",
        type: "integer",
        isNullable: false,
      })
    );

    // creates table foreign key
    await queryRunner.createForeignKey(
      "address",
      new TableForeignKey({
        name: "EnderecoClienteId",
        columnNames: ["Cliente_Id"],
        referencedTableName: "Cliente",
        referencedColumnNames: ["ID_Cliente"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // drops foreign key
    await queryRunner.dropForeignKey("endereco", "EnderecoClienteId");

    // drops column
    await queryRunner.dropColumn("endereco", "Cliente_Id");
  }
}
