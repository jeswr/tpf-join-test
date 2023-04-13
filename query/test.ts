import { QueryEngine } from '@comunica/query-sparql';

const engine = new QueryEngine();

const query = `
PREFIX ex: <http://example.org/>

SELECT ?s ?p ?o WHERE {
  ?s ?p ?o .
}
`

// 1000 results per page

// 11 requests
// SELECT ?s ?o WHERE {
//   ?s ex:worksFor ?o .
// }

// 21 requests
// SELECT ?s ?o WHERE {
//   ?s ex:name ?o .
// }

// 10012 requests
// SELECT ?s ?o WHERE {
//   ?s ex:worksFor ?o1 .
//   ?o1 ex:name ?o .
// }

// 10012 requests
// SELECT ?s ?o WHERE {
//   ?s ex:worksFor/ex:name ?o .
// }

// 71 requests
// SELECT ?s ?o WHERE {
//   ?s ?p ?o .
// }


// 250 results per page

// 81 requests
// SELECT ?s ?o WHERE {
//   ?s ex:worksFor ?o .
// }

// 41 requests
// SELECT ?s ?o WHERE {
//   ?s ex:name ?o .
// }

// 10042 requests
// SELECT ?s ?o WHERE {
//   ?s ex:worksFor ?o1 .
//   ?o1 ex:name ?o .
// }

// 10042 requests
// SELECT ?s ?o WHERE {
//   ?s ex:worksFor/ex:name ?o .
// }

// 281 requests
// SELECT ?s ?o WHERE {
//   ?s ?p ?o .
// }

const fetchFn = globalThis.fetch;

let i = 0;

// @ts-ignore
globalThis.fetch = (...args) => {
  console.log(`fetch called with [${args[0]}] [${i++}]`);
  return fetchFn(...args);
}



async function main() {
  let res = ''
  engine.resultToString(await engine.query(query, { sources: [ 'http://localhost:5000/earl' ]}),
  'text/csv'
  ).then(r => r.data.on('data', d => res += d.toString()).on('end', () => { console.log('done!'); }))
}

main();
