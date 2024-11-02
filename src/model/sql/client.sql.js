const GET_CLIENT = `
SELECT
  *
FROM clients
WHERE token = $1;
`

export default {
  GET_CLIENT
}