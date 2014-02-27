WITH RECURSIVE nodes(insideParentId, insideParentName, outsideParentId, outsideParentName, childId, childName, childPicture, path) AS (
	SELECT
		r."insideParentId", p1."name",
		r."outsideParentId", p2."name",
		r."childId", p3."name", p3."picture",
		ARRAY[r."insideParentId"]
	FROM "PedigreeRelations" AS r, "People" AS p1, "People" AS p2, "People" AS p3
	WHERE r."insideParentId" = :rootId
	AND p1."id" = r."insideParentId" AND p2."id" = r."outsideParentId" AND p3."id" = r."childId"
	UNION ALL
	SELECT
		r."insideParentId", p1."name",
		r."outsideParentId", p2."name",
		r."childId", p3."name", p3."picture",
		path || r."insideParentId"
	FROM "PedigreeRelations" AS r, "People" AS p1, "People" AS p2, "People" AS p3,
		nodes AS nd
	WHERE r."insideParentId" = nd.childId
	AND p1."id" = r."insideParentId" AND p2."id" = r."outsideParentId" AND p3."id" = r."childId"
)
SELECT * FROM nodes;
