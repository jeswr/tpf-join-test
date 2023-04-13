Run (tested on Node 16)
```
cd ./server
npm install
npm run serve
cd ..
```

then run

```
cd ./query
npm t
```

**Note the fact that we need 2 repos here points to another issue about the TPF server and comunica not being able to be installed in the same project due to ComponentsJS conflicts.**

Current results

For 1000 results per page

|Query|Requests|
|-----|--------|
|`?s ex:worksFor ?o` | 11 |
|`?s ex:name ?o` | 21 |
|`?s ex:worksFor/ex:name ?o` and `?s ex:worksFor ?o1 . ?o1 ex:name ?o .` | 10012 |
|`?s ?p ?o .` | 71 |

For 250 results per page
|Query|Requests|
|-----|--------|
|`?s ex:worksFor ?o` | 41 |
|`?s ex:name ?o` | 81 |
|`?s ex:worksFor/ex:name ?o` and `?s ex:worksFor ?o1 . ?o1 ex:name ?o .` | 10042 |
|`?s ?p ?o .` | 281 |
