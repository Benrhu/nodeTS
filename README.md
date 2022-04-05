--> NodeTs - A project to learn Node + MongoDB with TypeScript <--

Dependencies:

-> { @typescript-eslint/eslint-plugin, 
eslint-config-standard, 
eslint-plugin-import, 
eslint-plugin-node, 
eslint-plugin-promise }

Eslint is a tool to detect wrong code or code which can be improved.

-> dotenv: to  manage enviroment variables.
-> express: The fucking best FW of node :)
-> ts-node: to transpile .ts files to .js files

NPMs:

-> build: "npx tsc", to transpile the code
-> start: "node dist/index.js", run from index.js.
-> dev: "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.ts\" ", run theese commands at the same time.
-> test: "jest", run jest which is a test tool based in JS.
-> serve:coverage": "npm run test && cd coverage/lcov-report && npx serve"

Enviroment variables:

-> .env: [PORT=8081]