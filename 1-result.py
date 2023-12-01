input = open("1-input.txt", "r")

lines = input.readlines()

result = 0

for line in lines:
    spells = [*line]
    left = 0
    right = len(spells) - 1
    left_num, right_num = 0, 0

    while left <= right:
        left_spell = spells[left]
        if left_num == 0:
            if left_spell.isnumeric():
                left_num = int(left_spell)
            else:
                left += 1

        right_spell = spells[right]
        if right_num == 0:
            if right_spell.isnumeric():
                right_num = int(right_spell)
            else:
                right -= 1

        if left_num != 0 and right_num != 0:
            break

    result += left_num * 10 + right_num

print(result)
