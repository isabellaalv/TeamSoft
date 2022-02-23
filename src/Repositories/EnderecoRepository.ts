import { EntityRepository, Repository } from "typeorm";

import { Endereco } from "../Model/Endereco";

@EntityRepository(Endereco)
class EnderecoRepository extends Repository<Endereco> {}

export { EnderecoRepository };