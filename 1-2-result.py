num_by_word = {
    "one":      1,
    "two":      2,
    "three":    3,
    "four":     4,
    "five":     5,
    "six":      6,
    "seven":    7,
    "eight":    8,
    "nine":     9
}

input = open("1-input.txt", "r")
lines = input.readlines()
result = 0

for line in lines:
    left = 0
    right = len(line) - 1
    left_num, right_num = 0, 0

    while left <= right:
        if left_num == 0:
            left_word = line[left:]
            if left_word[0].isnumeric():
                left_num = int(left_word[0])
            else:
                for num in num_by_word:
                    if left_word.startswith(num):
                        left_num = num_by_word[num]
                if left_num == 0:
                    left += 1

        if right_num == 0:
            right_word = line[:right]
            if right_word[len(right_word)-1].isnumeric():
                right_num = int(right_word[len(right_word)-1])
            else:
                for num in num_by_word:
                    if right_word.endswith(num):
                        right_num = num_by_word[num]
                if right_num == 0:
                    right -= 1

        if left_num != 0 and right_num != 0:
            break

    result += left_num * 10 + right_num

print(result)
