SELECT
id,
name AS "name",
picture,
birth_date AS "birthDate",
death_date AS "deathDate",
alive_status AS "aliveStatus",
job,
address,
picture,
gender,
phone_no AS "phoneNo",
id_card AS "idCard",
note,
ARRAY (SELECT outside_person_id FROM marriage_relations_union WHERE inside_person_id = :id) AS "marriageId",
ARRAY (SELECT outside_person_name FROM marriage_relations_union WHERE inside_person_id = :id) AS "marriageName",
ARRAY (SELECT outside_person_picture FROM marriage_relations_union WHERE inside_person_id = :id) AS "marriagePicture"
FROM people
WHERE id = :id;
