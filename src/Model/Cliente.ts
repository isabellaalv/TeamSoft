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



   /*

   Bonus - Apenas para leitura (Feito com a ajuda do site stackoverflow e
    de outras refêrecias)


    async putCliente(Cliente){
        const db = await Database();

        const data = await db.get(`SELECT Id_Cliente FROM table_Cliente WHERE CNPJ like "%${Cliente.CNPJ}%"`)
        cliente["ID-Cliente"] = data["ID_Cliente"]
/
        await db.run(`UPDATE table_cliente SET cnpj="${cliente.cnpj}",
                    Contato="${cliente.contato}",
                    Razao_Social="${cliente["razao-social"]}",
                    Telefone="${cliente.Telefone}" WHERE ID_Cliente="${Cliente["ID-Cliente"]}"`,function(err) {
            if(err) throw new Error('Error na Inserção');
        });
        
        //Pegar nova posicão lat, lng do novo endereço
        //criar requisição API Google Geocoding para pegar Lat e Long
        let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cliente.enderecos.Numero},${cliente.enderecos.Endereco},${cliente.enderecos.Bairro},${cliente.enderecos.Cidade},${cliente.enderecos.estado},${cliente.enderecos.CEP}&key=${process.env.YOUR_API_KEY}`)
        retorno = retorno.data
        
        if(retorno.status !== 'OK'){
            throw new Error("Error na API Google");
        } else {
            Cliente.enderecos.latitude = retorno.results[0].geometry.location.lat
            Cliente.enderecos.longitude = retorno.results[0].geometry.location.lng
        }
        //alterar(PUT) Endereco
        await Endereco.putEndereco(Cliente)

        await db.close()
    }

}*/
