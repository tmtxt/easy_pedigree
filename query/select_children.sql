SELECT p."id", p."name", p."picture"
FROM "People" as p INNER JOIN "PedigreeRelations" as r
ON p."id" = r."childId"
WHERE r."insideParentId" = :insideParentId
