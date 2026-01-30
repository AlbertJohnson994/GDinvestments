Explicação dos Principais Componentes:
Investment (Entidade): Classe principal que representa um ativo na carteira

AssetType (Enum): Enumeração dos tipos de ativos suportados

InvestmentController: Controlador REST com endpoints definidos

InvestmentService: Interface com regras de negócio

InvestmentServiceImpl: Implementação do serviço com lógica de cálculo

InvestmentRepository: Interface para operações com banco de dados

DTOs: Objetos para transferência de dados entre camadas

MarketDataService: Serviço opcional para atualização de preços de mercado

Considerações Técnicas:
Separação de Camadas: Controller → Service → Repository → Database

DTO Pattern: Isola a entidade JPA das requisições/respostas HTTP

Enum para Tipos: Garante consistência nos tipos de ativos

Camada de Serviço: Contém toda a lógica de negócio e cálculos

Repository Pattern: Abstrai o acesso ao banco de dados

Este diagrama pode ser implementado com as seguintes tecnologias:

Spring Boot 3.x

Spring Data JPA

PostgreSQL/MySQL (via Docker)

ModelMapper para conversão DTO/Entity

Validation para validação de dados

OpenAPI/Swagger para documentação (opcional)

