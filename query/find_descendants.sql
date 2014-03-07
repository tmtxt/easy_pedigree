WITH RECURSIVE nodes(
     inside_parent_id,
     inside_parent_name,
     outside_parent_id,
     outside_parent_name,
     child_id,
     child_name,
     child_picture, path) AS (
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
	WHERE r."inside_parent_id" = nd.child_id
)
-- now change the naming convention to camelCase before return
SELECT
        inside_parent_id AS "insideParentId",
        inside_parent_name AS "insideParentName",
        outside_parent_id AS "outsideParentId",
        outside_parent_name AS "outsideParentName",
        child_id AS "childId",
        child_name AS "childName",
        child_picture AS "childPicture",
        "path" AS "path"
FROM nodes;
