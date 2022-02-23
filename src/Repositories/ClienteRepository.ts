import { EntityRepository, Repository } from "typeorm";

import { Cliente } from "../Model/Cliente";

@EntityRepository(Cliente)
class ClienteRepository extends Repository<Cliente> {}

export { ClienteRepository };