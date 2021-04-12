import { gqlResponse } from '../../../utils/response';

const ping = () => gqlResponse('Pong');

export { ping };