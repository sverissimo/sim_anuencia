import sys
import json

def format_line(lin):
    lin = lin.strip().split(',')
    lin.pop()
    return lin

a = sys.stdin
coordinates = []


for line in a:
    count = line.find('<coordinates>')
    if (count >= 0):
        b = a.readline()
        c = b.split()
        points = []
        polygon = []
        d = a.readline()
        single_line = d.find('</coordinates>')
        if (single_line >= 0):
            for coords in c:
                points = coords.split(',')
                points.pop()
                polygon.append(points)
                points = []
            for p in polygon:
                coordinates.append({'lat': float(p[1]), 'lng': float(p[0])})
            js_coords = json.dumps(coordinates)
            print(js_coords)
        elif(single_line <= 0):
            b = format_line(b)
            d = format_line(d)
            polygon.append(b)
            polygon.append(d)
            e = a.readline()            
            while (e.find('</coordinates>') <= 0):
                e = format_line(e)
                polygon.append(e)
                e = a.readline()
            for p in polygon:
                coordinates.append({'lat': float(p[1]), 'lng': float(p[0])})
            js_coords = json.dumps(coordinates)
            print(js_coords)

            """   e = format_line(e)
                print(e)
                polygon.append(e)
            """

            # print(polygon)


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
