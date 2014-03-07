WITH RECURSIVE nodes(
     insideParentId,
     insideParentName,
     outsideParentId,
     outsideParentName,
     childId,
     childName,
     childPicture, path) AS (
	SELECT
		r."inside_parent_id", r."inside_parent_name",
		r."outside_parent_id", r."outside_parent_name",
		r."child_id", r."child_name", r."child_picture",
		ARRAY[r."inside_parent_id"]
	FROM "people_hierarchy_relations_union" AS r
	WHERE r."inside_parent_id" = :rootId
	UNION ALL
	SELECT
		r."inside_parent_id", r."inside_parent_name",
		r."outside_parent_id", r."outside_parent_name",
		r."child_id", r."child_name", r."child_picture",
		path || r."inside_parent_id"
	FROM "people_hierarchy_relations_union" AS r, nodes AS nd
	WHERE r."inside_parent_id" = nd.childId
)
SELECT * FROM nodes;
