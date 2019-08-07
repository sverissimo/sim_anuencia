# sim_anuencia

# Restauração do Banco de Dados

1) Baixar a última pasta de Backup no Google Drive do usuário REGULACAO.RMBH para a pasta /Temp/ do servidor

2) entrar na pasta /Temp/XXmêsYY/sim_anuencia_db

3) Rodar o comando 
```
mongorestore -d sim_anuencia_db ./
```

4) o diretório padrão dos dados do mongo é
/data/db

5) Verificar se os dados foram carregados para o Banco corretamente

```
mongo
```
```
show dbs
```
