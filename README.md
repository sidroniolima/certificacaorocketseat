# certificacaorocketseat

Projeto Meetapp contendo backend, frontend e mobile.

# Instruções

# Pré-requisitos: 

Backend: mongodb, redis, postgres e serviço de envio de email. Os serviços devem estar configurados e rodando. Recomenda-se a instalação via Docker.

Para testes de envio de email recomenda-se a utilização do https://mailtrap.io/.

# Configurações:

Backend: 
1 - Configurar as variáveis do .env de acordo com o exemplo em .env.example.

Frontend: 
1 - caso o servidor node com o back esteja em outro servidor substituir o localhost em /src/services/api.js para o IP do servidor.

Mobile: 
1 - substituir o IP da configuração do Reactotron para o IP da máquina.
2 - substituir o IP do backend em /src/services/api.js para o IP do servidor node com o backend rodando.

# Execução

Backend:
1 - yarn queue -> para execução da fila para processamento de requisições de envio de email pelo back.
2 - yarn run dev -> execução do servidor

Front
1 - yarn start -> execução do front

Mobile
1 - android: react-native run-android
2 - android: react-native start




