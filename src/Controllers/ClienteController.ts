import { Request, Response, } from "express";
import { CNPJValidation, ClienteValidation, ClienteCnpjInfoValidation } from "../Validations/Validations";
import { ClientesService } from "../Services/ClienteServices";
import { Cliente } from "../Model/Cliente";


class ClienteController {
    async adicionarCliente(request: Request, response: Response) {
        const clientesService = new ClientesService();

        try {
            let cliente = request.body as Cliente

            const { error, value } = ClienteValidation.validate(cliente)

            if (error) {
                response.json({
                    error
                })
            } else {
                await clientesService.create(cliente);
                
                response.json({ message: "Inserção Completa" })
            }
        } catch (error) {
            response.json({
                "mensagem-de-error": "Inserção Incompleta",
                "tipo-de-error": error.message
            })
        }
    }

    async listarTodosClientes(request: Request, response: Response){
        const clientesService = new ClientesService();

        try {
            const clientes = await clientesService.getAllClientes();
            
            response.json(clientes)
        } catch (error) {
            response.json({
                "mensagem-de-error": "Não foi possível completar a listagem",
                "tipo-de-error": error.message
            })
        }
    }

    async DeletarClientePorCNPJ(request: Request, response: Response){
        const clientesService = new ClientesService();

        try {
            const { cnpj } = request.params

            const { error, value } = CNPJValidation.validate({ cnpj: cnpj })

            if (error) {
                response.json({
                    error
                })
            } else {
                await clientesService.deleteClienteByCNPJ(cnpj)

                response.json({ message: "Deletado com sucesso" })
            }
        } catch (err) {
            response.json({ message: "Não foi possível completar a deletaçaõ" })
        }
    }

    async alterarCliente(request: Request, response: Response){
        const clientesService = new ClientesService();

        try {
            const cliente = request.body as Cliente

            const { error, value } = ClienteCnpjInfoValidation.validate(cliente)

            if (error) {
                response.json({
                    error
                })
            } else {
                await clientesService.putClienteByCNPJ(cliente)
                
                response.json({ message: "Atualização Completa" })
            }
        } catch (error) {
            response.json({
                "mensagem-de-error": "Não foi possível atualizar",
                "tipo-de-error": error.message
            })
        }
    }

}

export { ClienteController }