import json
import psycopg2
import sys

from schemup import commands
from schemup.dbs import postgres
from schemup.validator import findSchemaMismatches

dryRun = not (len(sys.argv) > 1 and sys.argv[1] == 'commit')

# TODO: Put into Schemup
class DictSchema(object):
    def __init__(self, path):
        self.versions = json.load(open(path, "r"))

    def getExpectedTableVersions(self):
        return sorted(self.versions.iteritems())

dbConfig = json.load(open("db.json", "r"))

pgConn = psycopg2.connect(**dbConfig)

pgSchema = postgres.PostgresSchema(pgConn, dryRun=dryRun)

dictSchema = DictSchema("versions.json")

pgSchema.ensureSchemaTable()

# Ensure current DB's integrity
schemaMismatches = findSchemaMismatches(pgSchema)
if schemaMismatches:
    print "Real schema & 'schemup_tables' are out of sync"
    for mismatch in schemaMismatches:
        print mismatch, "\n"
    sys.exit(1)

commands.load('migrations')
sqls = commands.upgrade(pgSchema, dictSchema)

if dryRun and sqls:
    print "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    for sql in sqls: print sql
    print "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"
    sys.exit(1)

commands.validate(pgSchema, dictSchema)
