const gqlResponse = <T>(result: T): { result: T } => ({ result });

export { gqlResponse };