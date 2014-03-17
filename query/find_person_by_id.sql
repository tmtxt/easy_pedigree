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
note
FROM people
WHERE id = :id;
