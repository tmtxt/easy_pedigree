SELECT pp.id, pp.name, pp.picture
FROM people as pp, pedigrees as pd
WHERE pp.id in (SELECT root_id from pedigrees)
LIMIT 1;
