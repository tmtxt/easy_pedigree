SELECT p."id", p."name", p."picture"
FROM "People" AS p
WHERE p."id" NOT IN (SELECT "childId" FROM "PedigreeRelations")
AND p."id" NOT IN (SELECT "outsidePersonId" FROM "MarriageRelations");
