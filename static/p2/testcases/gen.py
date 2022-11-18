from random import randrange
from math import sqrt, e, ceil
from pathlib import Path

T = 200
STAGE = 10
MAX_N = 100_000

def gen(num, n, k):
    f = open(str(Path(__file__).parent.resolve())+'/t'+str(num), 'w')
    arr = []
    for i in range(n):
        arr.append(str(randrange(-10_000, 10_000)))
    f.write('['+','.join(arr)+']\n')
    f.write(str(k)+'\n')
    f.close()

for i in range(1, T+1):
    n = ceil(MAX_N * pow(i / T, e))
    k = randrange(1, round(n / sqrt(n))+1)
    print(n, k)
    gen(i, n, k)
