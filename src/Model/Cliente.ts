import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import { Endereco } from "./Endereco";

@Entity("table_cliente")
class Cliente {
    
    @PrimaryColumn()
    CNPJ: string;

    @Column()
    "Razao-Social": string;

    @Column()
    Contato: string;

    @Column()
    Telefone: string;

    @OneToMany(type => Endereco, enderecos => enderecos.cliente)
    endereco: Endereco[]

}

export { Cliente }
