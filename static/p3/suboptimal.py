def solution(nums, k):
    answer = []
    window = []
    for i in range(k):
        window.append(nums[i])
    for i in range(k, len(nums)):
        m = max(window)
        answer.append(m)
        window.pop(0)
        window.append(nums[i])
    m = max(window)
    answer.append(m)
    return answer