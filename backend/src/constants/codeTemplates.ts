export const PythonSolutionTemplate = (code: string, ...args: string[]) => `
${code}

print(solution(${args.join(',')}))
`

export const CppSolutionTemplate = (code: string, ...args: string[]) => `
#include <iostream>
#include <vector>
#include <boost/assign/std/vector.hpp>
using namespace boost::assign;
using namespace std;

${code}

int main()
{
  vector<int> args;
  args += ${args.slice(1, -1)};
  cout << solution(args) << "\n";
  return 0;
}
`

export const JavascriptSolutionTemplate = (code: string, ...args: string[]) => `
${code}

console.log(solution(${args.join(', ')}))
`
