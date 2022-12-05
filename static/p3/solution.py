def solution(nums, k):
    maxSliding = []
    window = []
    for i in range(0, len(nums)):
        while 0 < len(window) and window[0] <= i - k:
            window.pop(0)
        while 0 < len(window) and nums[window[0]] < nums[i]:
            window.pop(0)
        while 0 < len(window) and nums[window[-1]] < nums[i]:
            window.pop()
        window.append(i)

        if k-1 <= i:
            maxSliding.append(nums[window[0]])
    return maxSliding
