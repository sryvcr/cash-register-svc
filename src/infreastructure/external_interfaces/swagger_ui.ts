import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';

const swaggerDocument = YAML.load('./oas3.yaml');

export { swaggerUi, swaggerDocument }
