import { gqlReponse } from '../../../utils/response';

const ping = () => gqlReponse('Pong');

export { ping };