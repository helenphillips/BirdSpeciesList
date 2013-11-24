# Helen Phillips
# Code to access tweets with the hashtag 'helensbirdlist'
# Collects (species) information in the tweets
# Appends information to a text file

import twitter, os, time

## import twitterlogon.py

api=twitter.Api(consumer_key ='R64frT2AvxqSQgFMKfEg',
consumer_secret='F2RfrOiOSFfcNxzNistcEc4GxVXWRbCG5en51RewI',
access_token_key= '33945150-3SZ9B11FFm7UNaNTkcr8gl7eGpoOlQ8p9vGoZXCw',
access_token_secret='2pqMAN8BfMewXxr4dVxHr9A18qkHXZncIq0JnO6id4')


os.chdir('/Users/Helen/TwitterBirdList')


LATESTFILE = 'bird_log.txt'
LOGFILE = 'birdlist_2013.txt'


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
    date = statusObj.created_at[4:16]
    txt = statusObj.text
    coords = statusObj.geo
    latlong = coords['coordinates']
    lat = latlong[0]
    lng = latlong[1]
    

    fp.write('\n' + '%s %s %s %s' % (date, txt, lat, lng))
fp.close()


# Update LATESTFILE to reflect the last tweet gathered in results
fp = open(LATESTFILE, 'w')
fp.write(str(max([x.id for x in results])))
fp.close()


