from random import randrange
from math import sqrt, e, ceil
from pathlib import Path
from solution import solution

T = 30
STAGE = 10
MAX_N = 1000

def gen(num, n, k):
    inputFile = open(str(Path(__file__).parent.resolve())+'/in/t'+str(num)+'.in', 'w')
    outputFile = open(str(Path(__file__).parent.resolve())+'/out/t'+str(num)+'.out', 'w')
    arr = []
    for i in range(n):
        arr.append(randrange(-100, 100))
    inputFile.write('['+','.join(map(str, arr))+']\n')
    inputFile.write(str(k)+'\n')
    inputFile.close()

    outputFile.write('['+','.join(map(str, solution(arr, k)))+']\n')
    outputFile.close()

for i in range(1, T+1):
    n = ceil(MAX_N * pow(i / T, e))
    k = randrange(1, round(n / sqrt(n))+1)
    print(n, k)
    gen(i, n, k)
