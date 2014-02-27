WITH RECURSIVE nodes(insideParentId, outsideParentId, childId) AS (
	SELECT r1."insideParentId", r1."outsideParentId", r1."childId", p1."name"
	FROM "PedigreeRelations" AS r1, "People" AS p1
	WHERE r1."childId" = p1."id" AND r1."insideParentId" = :rootId
	UNION
	SELECT r2."insideParentId", r2."outsideParentId", r2."childId", p2."name"
	FROM "PedigreeRelations" AS r2, "People" AS p2, nodes AS r3
	WHERE r2."insideParentId" = r3.childId AND r2."childId" = p2."id"
)
SELECT * FROM nodes;
