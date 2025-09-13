package main

import "fmt"

func main() {
	// 1. Name Validator
	// fmt.Println(validName("I. Tri"))
	// fmt.Println(validName("I. T. Septian"))
	// fmt.Println(validName("Ivan T. Septian"))
	// fmt.Println(validName("Ivan"))
	// fmt.Println(validName("i. Tri"))
	// fmt.Println(validName("I Tri"))
	// fmt.Println(validName("I. Tri Septian"))
	// fmt.Println(validName("I. Tri P."))
	// fmt.Println(validName("Ivan. Tri Septian"))

  // 2. Find All Numbers Disappeared in an Array
	fmt.Println(findDisappeared([]int{4,3,2,7,8,2,3,1}))
	fmt.Println(findDisappeared([]int{1,1}))
}

// func validName(name string) bool {
// 	// re := regexp.MustCompile(`^([A-Z]\.|[A-Z][a-z]+)(\s([A-Z]\.|[A-Z][a-z]+))*\s[A-Z][a-z]+$`)
// 	// // (`^([A-Z]\.|[A-Z][a-z]+)(\s([A-Z]\.|[A-Z][a-z]+))*\s[A-Z][a-z]+$`)
// 	// return re.MatchString(name)
// 	return true
// }

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