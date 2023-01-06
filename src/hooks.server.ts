import { start_mongo } from "$db/mongo";
import "$apollo/apollo-server";

start_mongo().then(() => {
    console.log('Mongo Started');
}).catch(e => {console.error(e)});

