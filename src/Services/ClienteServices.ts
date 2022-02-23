import { getCustomRepository, Repository } from "typeorm"
import axios from "axios"
import { Cliente } from "../Model/Cliente";
import { Endereco } from "../Model/Endereco";
import { ClienteRepository } from "../Repositories/ClienteRepository";
import { EnderecoRepository } from "../Repositories/EnderecoRepository"

class ClientesService {
    private clienteRepository: Repository<Cliente>
    private enderecoRepository: Repository<Endereco>

    constructor() {
        this.clienteRepository = getCustomRepository(ClienteRepository)
        this.enderecoRepository = getCustomRepository(EnderecoRepository)
    }

    async create(cliente: Cliente){
        let newCliente = this.clienteRepository.create(cliente)
        
        const clienteExist = await this.clienteRepository.findOne({CNPJ: newCliente.CNPJ})
        
        if(clienteExist){
            throw new Error("Erro de usuario existente")
        }
        
        newCliente = await this.clienteRepository.save(newCliente)
        
        let newEndereco = this.enderecoRepository.create({...cliente.endereco[0]})

        
        let retorno = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${newEndereco.Numero},${newEndereco.Endereco},${newEndereco.Bairro},${newEndereco.Cidade},${newEndereco.Estado},${newEndereco.CEP}&key=${process.env.YOUR_API_KEY}`)
        
        if(retorno.data.status !== 'OK'){
            throw new Error("Erro na API Google");
        } else {
            newEndereco.Latitude = retorno.data.results[0].geometry.location.lat
            newEndereco.Longitude = retorno.data.results[0].geometry.location.lng
        }
        
        newEndereco.cliente = newCliente
        await this.enderecoRepository.save(newEndereco)
        
    }

    async getAllClientes(){
        return await this.clienteRepository.find({relations: ["endereco"]});
    }


    async deleteClienteByCNPJ(cnpj: string){
        await this.clienteRepository.delete({CNPJ: cnpj})
    }

    async putClienteByCNPJ(cliente: Cliente){
        const cnpj = cliente.CNPJ
        await this.clienteRepository.createQueryBuilder().update(Cliente).set({...cliente}).where("CNPJ = :CNPJ",{cnpj})
        .execute()
    }
}

export { ClientesService }