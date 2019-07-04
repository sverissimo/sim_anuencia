import sys

a = sys.stdin
#print(a)
# print(a.readlines())
for line in a:
    count = line.find('<coordinates>')
    if (count >= 0):
        b = a.readline()
        c=b.split()
        points = []
        polygon = []
        for coords in c:
                points = coords.split(',')                                                
                points.pop()
                polygon.append(points)                
                points = []
        print (polygon)
        


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
