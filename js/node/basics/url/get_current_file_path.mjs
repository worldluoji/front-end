import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = dirname(__filename);
console.log(__dirname);

console.log(process.cwd());