# Helen Phillips
# Code to access tweets with the hashtag 'helensbirdlist'
# Collects (species) information in the tweets
# Appends information to a text file


import twitter, os, time
from datetime import datetime

os.chdir('/Users/Helen/BirdSpeciesList')


from secrets import *
import httplib2, urllib, urllib2
from apiclient.discovery import build
from oauth2client.client import SignedJwtAssertionCredentials
from oauth2client.client import Storage

LATESTFILE = 'bird_log.txt'
LOGFILE = 'birdlist_2013.txt'
API_EMAIL = APIEMAIL
table_id = tableID
api = api



## Read the client_secrets key

KEY_FILE = "pk.pem"
k = file(KEY_FILE,'rb')
key = k.read()
k.close()

## Open a connection and initiate a storage area for the key
http = httplib2.Http()
storage = Storage()

## Create authorisation for fusion tables
creds = SignedJwtAssertionCredentials(API_EMAIL, key,   
    scope='https://www.googleapis.com/auth/fusiontables')
http = creds.authorize(http)
service = build("fusiontables", "v1", http=http)


# Find the last tweet that information was taken from

if os.path.exists(LATESTFILE):
    fp = open(LATESTFILE)
    lastid = fp.read().strip()
    fp.close()

    if lastid == '':
        lastid = 0
else:
    lastid = 0

# Perform the search
# Searching since the last search

results = api.GetSearch('helensbirdlist', since_id=lastid)
print 'Found %s results.' % (len(results))
if len(results) == 0:
    print 'Nothing to reply to. Quitting.'


#Open LOGFILE
fp = open(LOGFILE, 'a')

# Get time information for the tweet and add to LOGFILE, and add text ie. species name


for statusObj in results:
    date = statusObj.created_at
    date_obj = datetime.strptime(date, '%a %b %d %H:%M:%S +0000 %Y')
    d = date_obj.strftime('%d/%m/%Y %I:%M%p')
    txt = statusObj.text
    coords = statusObj.geo
    latlong = coords['coordinates']
    lat = latlong[0]
    lng = latlong[1]
    
    ## generating SQL request and inserting into fusion table
    query = "INSERT INTO %s (Date, Species, Latitude, Longitude) VALUES ('%s', '%s', '%s', '%s')" % (table_id, d, txt, lat, lng)
    print(service.query().sql(sql=query).execute())

    fp.write('\n' + '%s %s %s %s' % (date, txt, lat, lng))
fp.close()


# Update LATESTFILE to reflect the last tweet gathered in results
fp = open(LATESTFILE, 'w')
fp.write(str(max([x.id for x in results])))
fp.close()


