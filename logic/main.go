package main

import (
	"fmt"
	"strings"
	"unicode"
)

func main() {
	// 1. Name Validator
	fmt.Println(validName("I. Tri"))
	fmt.Println(validName("I. T. Septian"))
	fmt.Println(validName("Ivan T. Septian"))
	fmt.Println(validName("Ivan"))
	fmt.Println(validName("i. Tri"))
	fmt.Println(validName("I Tri"))
	fmt.Println(validName("I. Tri Septian"))
	fmt.Println(validName("I. Tri P."))
	fmt.Println(validName("Ivan. Tri Septian"))

  // 2. Find All Numbers Disappeared in an Array
	fmt.Println(findDisappeared([]int{4,3,2,7,8,2,3,1}))
	fmt.Println(findDisappeared([]int{1,1}))
}

func validName(name string) bool {
	// re := regexp.MustCompile(`^([A-Z]\.|[A-Z][a-z]+)(\s([A-Z]\.|[A-Z][a-z]+))*\s[A-Z][a-z]+$`)
	// // (`^([A-Z]\.|[A-Z][a-z]+)(\s([A-Z]\.|[A-Z][a-z]+))*\s[A-Z][a-z]+$`)
	// return re.MatchString(name)

	// 1. split name
	splitName := strings.Split(name, " ")

	// 2. Rule: Must have 2 or 3 terms only
	if len(name) < 2 || len(splitName) > 3 {
		return false
	}

	for i, val := range splitName {
		if len(val) == 0 {
			return false
		}

		// check if it is valid initial (1 uppercase letter + dot)
		isValidInitial := len(val) == 2 && val[1] == '.' && unicode.IsUpper(rune(val[0]))

		// check if it is a valid word
		isValidWord := len(val) >= 2 && !strings.Contains(val, ".") && unicode.IsUpper(rune(val[0])) && val[1:] == strings.ToLower(val[1:])

		// last name (last index) must always be a word
		if i == len(splitName)-1 {
			if !isValidWord {
				return false
			}
		} else {
			// first name in middle name can be initial or word
			if !isValidInitial && !isValidWord {
				return false
			}
		}

	}

	// 3. cannot have initial first + word middle
	if len(splitName) == 3 {
		firstName := splitName[0]
		middleName := splitName[1]

		firstIsInitial := len(firstName) == 2 && firstName[1] == '.' && unicode.IsUpper(rune(firstName[0]))
		middleIsWord := len(middleName) >= 2 && !strings.Contains(middleName, ".") && unicode.IsUpper(rune(middleName[0])) && middleName[1:] == strings.ToLower(middleName[1:])

		if firstIsInitial && middleIsWord {
			return false
		}
	}

	return true
}

func findDisappeared(nums []int) []int {
	// var lost_number []int
	var lengthNumber = len(nums)
	var existNumbers []int
	var missingNumbers []int
	seen := make(map[int]bool)

	for i := 1; i <= lengthNumber; i++ {
		// fmt.Println(nums[i])
		for _, val := range nums {
			// fmt.Printf("%s == %s ? %b\n", i, val, i == val)
			if i == val && !seen[val] {
				existNumbers = append(existNumbers, val)
				seen[val] = true
			}
		}
	}

	for i := 1; i <= lengthNumber; i++ {
		found := false
		for _, val := range existNumbers {
			// fmt.Println(i == val)
			if i == val {
				found = true
				break
			}
		}
		if (!found) {
			missingNumbers = append(missingNumbers, i)
		}
	}

	return missingNumbers
}