import * as fs from 'fs';
import path from 'path';

let text = `
@prefix ex: <http://example.org/> .
`;

for (let i = 0; i < 10_000; i+= 1) {
  text += `
  ex:${i} a ex:Person ;
  ex:name "Person ${i}" ;
  ex:age ${i} ;
  ex:knows ex:${i + 1} ;
  ex:worksFor [
    a ex:Organization ;
    ex:name "Organization ${i}" ;
  ] ;
  .

  `
}

fs.writeFileSync(path.join(__dirname, 'earl.ttl'), text);
