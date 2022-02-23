import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity("table_endereco")
class Endereco {
    
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Endereco: string

    @Column()
    Numero: number

    @Column({nullable: true})
    Complemento: string

    @Column()
    Bairro: string

    @Column()
    Cidade: string

    @Column()
    Estado: string

    @Column()
    CEP: string

    @Column('decimal', { precision: 9, scale: 2 })
    Latitude: number

    @Column('decimal', { precision: 9, scale: 2 })
    Longitude: number

    @ManyToOne(() => Cliente, cliente => cliente.endereco, { onDelete: 'CASCADE' })
    @JoinColumn({name: "id_fk_cliente"})
    cliente: Cliente
}

export { Endereco }


