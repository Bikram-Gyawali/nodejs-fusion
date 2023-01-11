const pagination = await getPagination(
  Number(limit || 20),
  Number(offset || 0),
  Contract,
  query
);

