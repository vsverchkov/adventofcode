package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

var allowedCntByColor = map[string]int{
	"red":   12,
	"green": 13,
	"blue":  14,
}

func main() {
	file, err := os.Open("2-input.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	resultPartOne, resultPartTwo := 0, 0
	for scanner.Scan() {
		line := scanner.Text()
		resultPartOne += partOne(line)
		resultPartTwo += partTwo(line)
	}

	fmt.Println("Part One: ", resultPartOne)
	fmt.Println("Part Two: ", resultPartTwo)
}

func partOne(line string) int {
	gameAndRec := strings.Split(line, ": ")
	game := gameAndRec[0]
	gameID, err := strconv.Atoi(strings.Split(game, " ")[1])
	if err != nil {
		panic(err)
	}

	rec := gameAndRec[1]
	sets := strings.Split(rec, "; ")
	valid := true
	for i := 0; i < len(sets); i++ {
		cntByCubes := strings.Split(sets[i], ", ")

		for j := 0; j < len(cntByCubes); j++ {
			cntAndColor := strings.Split(cntByCubes[j], " ")

			allowedCnt := allowedCntByColor[cntAndColor[1]]
			actualCnt, err := strconv.Atoi(cntAndColor[0])
			if err != nil {
				panic(err)
			}

			if actualCnt > allowedCnt {
				valid = false
				break
			}
		}

		if !valid {
			break
		}
	}

	if valid {
		return gameID
	}
	return 0
}

func partTwo(line string) int {
	rec := strings.Split(line, ": ")[1]

	sets := strings.Split(rec, "; ")
	maxCntByColor := make(map[string]int)

	for i := 0; i < len(sets); i++ {
		cntByCubes := strings.Split(sets[i], ", ")

		for j := 0; j < len(cntByCubes); j++ {
			cntAndColor := strings.Split(cntByCubes[j], " ")

			color := cntAndColor[1]
			cnt, err := strconv.Atoi(cntAndColor[0])
			if err != nil {
				panic(err)
			}

			maxCnt, ok := maxCntByColor[color]
			if !ok || cnt > maxCnt {
				maxCntByColor[color] = cnt
			}
		}
	}

	result := 1
	for _, v := range maxCntByColor {
		result *= v
	}

	return result
}
