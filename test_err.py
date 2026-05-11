import urllib.request
import json
req = urllib.request.Request(
    'http://127.0.0.1:5000/api/auth/register',
    data=json.dumps({'name':'test','email':'test6@test.com','password':'password123'}).encode('utf-8'),
    headers={'Content-Type': 'application/json'}
)
try:
    urllib.request.urlopen(req)
except Exception as e:
    print(e.read().decode('utf-8'))
