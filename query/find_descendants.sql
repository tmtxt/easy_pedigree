WITH RECURSIVE nodes(
     inside_parent_id,
     inside_parent_name,
     outside_parent_id,
     outside_parent_name,
     child_id,
     child_name,
     child_picture,
     child_marriage_id,
     child_marriage_name,
     child_marriage_picture,
     path) AS (
	SELECT
		r."inside_parent_id", r."inside_parent_name",
		r."outside_parent_id", r."outside_parent_name",
		r."child_id", r."child_name", r."child_picture",
		ARRAY (SELECT outside_person_id FROM marriage_relations_union WHERE inside_person_id = r.child_id) AS child_marriage_id,
		ARRAY (SELECT outside_person_name FROM marriage_relations_union WHERE inside_person_id = r.child_id) AS child_marriage_name,
		ARRAY (SELECT outside_person_picture FROM marriage_relations_union WHERE inside_person_id = r.child_id) AS child_marriage_picture,
		ARRAY[r."inside_parent_id"]
	FROM "people_hierarchy_relations_union" AS r
	WHERE r."inside_parent_id" = 1
	UNION ALL
	SELECT
		r."inside_parent_id", r."inside_parent_name",
		r."outside_parent_id", r."outside_parent_name",
		r."child_id", r."child_name", r."child_picture",
		ARRAY (SELECT outside_person_id FROM marriage_relations_union WHERE inside_person_id = r.child_id) AS child_marriage_id,
		ARRAY (SELECT outside_person_name FROM marriage_relations_union WHERE inside_person_id = r.child_id) AS child_marriage_name,
		ARRAY (SELECT outside_person_picture FROM marriage_relations_union WHERE inside_person_id = r.child_id) AS child_marriage_picture,
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
        child_marriage_id AS "childMarriageId",
        child_marriage_name AS "childMarriageName",
        child_marriage_picture AS "childMarriagePicture",
        "path" AS "path"
FROM nodes;
