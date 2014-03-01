-- based on the find_descendants.sql
WITH RECURSIVE nodes(insideParentId, childId, depth) AS (
	SELECT
		r."insideParentId",
		r."childId", 1
	FROM "PedigreeRelations" AS r
	WHERE r."insideParentId" = :rootId
	UNION ALL
	SELECT
		r."insideParentId",
		r."childId",
		nd.depth + 1
	FROM "PedigreeRelations" AS r, nodes AS nd
	WHERE r."insideParentId" = nd.childId
)
SELECT max(depth) FROM nodes;
