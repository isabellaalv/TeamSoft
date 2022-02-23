import { Router } from "express";
import { ClienteController } from "./src/Controllers/ClienteController";
import { EnderecoController } from "./src/Controllers/EnderecoController";

const routes = Router();

const clienteController = new ClienteController()
const enderecoController = new EnderecoController()

routes.get("/clientes", clienteController.listarTodosClientes);
routes.delete("/cliente/:CNPJ", clienteController.DeletarClientePorCNPJ);
routes.post("/cliente", clienteController.adicionarCliente);
routes.put("/cliente", clienteController.alterarCliente);

routes.post("/endereco", enderecoController.adicionarEndereco);
routes.delete("/Endereco/:ID", enderecoController.DeletarEnderecoPorId)
routes.put("/Endereco", enderecoController.alterarCliente)


export { routes }