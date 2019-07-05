import sys
import json

a = sys.stdin
# print(a)
# print(a.readlines())
coordinates = []
for line in a:
    count = line.find('<coordinates>')
    if (count >= 0):
        b = a.readline()
        c = b.split()
        points = []
        polygon = []
        for coords in c:
            points = coords.split(',')
            points.pop()
            polygon.append(points)
            points = []
        for p in polygon:
            coordinates.append({'lat': float(p[1]), 'lng': float(p[0])})
        jCoords = json.dumps(coordinates)
        print(jCoords)


""" with open(sys.stdin) as f:
    for line in f:
        li = list(f)
        print(li) """


""" k = 0
try:
    for line in iter(sys.stdin.readline, b''):
        k = k + 1
        print(line)
except KeyboardInterrupt:
    sys.stdout.flush()
    pass
print(k)  """

sys.stdout.flush()
