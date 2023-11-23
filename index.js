const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql");

require("dotenv").config();

const resolvers = {
  Query: {
    etherBalanceByAddress: (
      root,
      _args,
      { dataSources } // Get ether balance by address
    ) => dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (
      root,
      _args,
      { dataSources } // Get total ether supply
    ) => dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (
      root,
      _args,
      { dataSources } // Get latest Ethereum price
    ) => dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (
      root,
      _args,
      { dataSources } // Get block confirmation time
    ) => dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs, // GraphQL schema definitions
  resolvers, // Map schema fields to data fetchers  
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), // Instantiate EtherDataSource 
  }), 
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
