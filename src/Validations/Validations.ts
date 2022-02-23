import Joi from "joi";


const ClienteValidation = Joi.object({
    CNPJ: Joi.string().length(14)
        .regex(/^[0-9]+$/)
        .required(),
    "Razao-Social": Joi.string().max(255)
        .required(),
    Contato: Joi.string()
        .required()
        .max(255),
    Telefone: Joi.string().max(20)
        .required()
        .regex(/^[0-9]{1,20}$/),
    Endereco: Joi.array().items(Joi.object({
        ID_Endereco: Joi.string().max(255).required(),
        Numero: Joi.number().required(),
        Complemento: Joi.string().max(255).allow(""),
        Bairro: Joi.string().max(50).required(),
        Cidade: Joi.string().max(50).required(),
        Estado: Joi.string().max(50).required(),
        CEP: Joi.string().length(8).required()
            .regex(/^[0-9]+$/)
    }))
})

const CNPJValidation = Joi.object({
    CNPJ: Joi.string().length(14)
        .regex(/^[0-9]+$/)
        .required()
})

const ClienteInfoValidation = Joi.object({
    "Razao-Social": Joi.string().max(255)
        .required(),
    Contato: Joi.string()
        .required()
        .max(255),
    Telefone: Joi.string().max(20)
        .required()
        .regex(/^[0-9]{1,20}$/)
})

const EnderecoClienteValidation = CNPJValidation.keys({
    Endereco: Joi.array().items(Joi.object({
        ID_Endereco: Joi.string().max(255).required(),
        Numero: Joi.number().required(),
        Complemento: Joi.string().max(255).allow(""),
        Bairro: Joi.string().max(50).required(),
        Cidade: Joi.string().max(50).required(),
        Estado: Joi.string().max(50).required(),
        CEP: Joi.string().length(8).required()
            .regex(/^[0-9]+$/)
    }))
})

const EnderecoValidation = Joi.object({
    ID_Endereco: Joi.number().required(),
    Endereco: Joi.string().max(255).required(),
    Numero: Joi.number().required(),
    Complemento: Joi.string().max(255).allow(""),
    Bairro: Joi.string().max(50).required(),
    Cidade: Joi.string().max(50).required(),
    Estado: Joi.string().max(50).required(),
    CEP: Joi.string().length(8).required()
        .regex(/^[0-9]+$/)
})

const ClienteCnpjInfoValidation = ClienteInfoValidation.keys({
    CNPJ: Joi.string().length(14)
        .regex(/^[0-9]+$/)
        .required()
})

const NumberValidation = Joi.string().regex(/^[0-9]+$/).required()

export { CNPJValidation,
    ClienteValidation,
    ClienteCnpjInfoValidation,
    EnderecoClienteValidation,
    NumberValidation,
    EnderecoValidation }
