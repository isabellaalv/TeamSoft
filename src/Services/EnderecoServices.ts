import { getCustomRepository, Repository } from "typeorm"
import axios from "axios"
import { Cliente } from "../Model/Cliente"
import { Endereco } from "../Model/Endereco"
import { ClienteRepository } from "../Repositories/ClienteRepository"
import { EnderecoRepository } from "../Repositories/EnderecoRepository"

interface IEnderecos{
    cnpj: string,
    enderecos: Endereco[]
}

class EnderecosService {
    private enderecoRepository: Repository<Endereco>
    private clienteRepository: Repository<Cliente>
    constructor() {
        this.enderecoRepository = getCustomRepository(EnderecoRepository)
        this.clienteRepository = getCustomRepository(ClienteRepository)
    }

    async create(endereco: IEnderecos){
        const { cnpj } = endereco;
        let newEnderecos = endereco.enderecos as Endereco[]
        
        const cliente = await this.clienteRepository.findOne({where: {cnpj: cnpj}})
        
        for (const iterator of newEnderecos) {
            let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${iterator.Numero},${iterator.Endereco},${iterator.Bairro},${iterator.Cidade},${iterator.Estado},${iterator.CEP}&key=${process.env.YOUR_API_KEY}`)
            
            if(retorno.data.status !== 'OK'){
                throw new Error("Error na API Google");
            } else {
                iterator.Latitude = retorno.data.results[0].geometry.location.lat
                iterator.Longitude = retorno.data.results[0].geometry.location.lng
                iterator.cliente = cliente
            }
        }

        if(cliente){
            await this.enderecoRepository.save(newEnderecos)
        } else {
            throw new Error("Cliente N Existe");
        }
    }

    async delete(id: number){
        await this.enderecoRepository.delete({Id: id})
    }

    async putEndereco(endereco: Endereco){
        const { Id } = endereco
    
        let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${endereco.Numero},${endereco.Endereco},${endereco.Bairro},${endereco.Cidade},${endereco.Estado},${endereco.CEP}&key=${process.env.YOUR_API_KEY}`)

        if(retorno.data.status !== 'OK'){
            throw new Error("Error na API Google");
        } else {
            endereco.Latitude = retorno.data.results[0].geometry.location.lat
            endereco.Longitude = retorno.data.results[0].geometry.location.lng
        }

        await this.enderecoRepository.createQueryBuilder().update(Endereco).set({...endereco}).where("id = :id",{Id})
        .execute()
    }

}

export { EnderecosService }