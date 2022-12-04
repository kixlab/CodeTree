export const PythonSolutionTemplate = (code: string, ...args: string[]) => `
${code}

print(solution(${args.join(',')}))
`

export const CppSolutionTemplate = (code: string, ...args: string[]) => `
${code}

int main()
{
  int k; cin >> k;
  int cnt; cin >> cnt;
  vector<int> nums;

  for (int i=0; i<cnt; i++) {
    int temp; cin >> temp;
    nums.push_back(temp);
  }

  vector<int> result = solution(nums, k);
  for (int i=0; i < result.size(); i++) {
    cout << result[i] << ',';
  }
  return 0;
}
`

export const JavascriptSolutionTemplate = (code: string, ...args: string[]) => `
${code}

console.log(solution(${args.join(', ')}))
`
