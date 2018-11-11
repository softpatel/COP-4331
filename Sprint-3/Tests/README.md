# Instruction to Compile and Run Tests # 
1. [Download Katalon Studio](https://www.katalon.com/download/)

2. Unzip and run the execution File (Go in files and click "katalon.exe")

3.Download and unzip AcceptanceTests file

4. Open Katalon -> File -> Open Project -> This PC -> Downloads -> Katalon Studio -> StudyApp_Sprint3 -> Select OK

5.Click Test Suites

6. Double Click a suite and press the drop down arrow next to the run button(looks like play button) to choose what browser to run tests    on. (Choose Chrome if possible) 

7. Repeat step 6 for the rest of the test suites.

*Note each test cases can be run individually. Just go to Test Cases.

** Read Test Suites section below for more info on each test cases.

**Don't Run Test 04 twice! Test will fail the second time since the account have already been made.**
## Test Suites ##
### User Account ###
1. Test 04: Create user account (CAN ONLY RUN ONCE!!!) 

2. Test 05: Login

3. Test 12: Logout

### Notes ###
1. Test 03: Create and save note

2. Test 06: View notes

3. Test 07: Select, edit, and delete note

### Flashcard ###
1. Test 01: Create and save flashcard

2. Test 02: Edit flashcard

3. Test 13: Study and delete flashcard

### Pomodoro Timer ###
*Note: This test suite takes the longest ~ 2 min

1. Test 08: Input study time

2. Test 09: Input break time

3. Test 10: Break notification 

4. Test 11: Study/Break time results

