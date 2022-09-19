export const ExampleCode1 = `# 이 줄은 주석으로 프로그램 실행 시 무시됩니다.
# Python에서 "Hello, world!"를 출력하는 프로그램은 다음과 같이 작성합니다.
print("Hello, world!")`

export const ExampleCode2 = `var_string = "Hello, world!"	# "Hello, world!"를 나타내는 문자열 변수 정의
var_number = 0                  # 0의 값을 가진 정수 변수 정의
var_float = 9.0			        # 소수 0.9의 값을 가진 변수 정의`

export const ExampleCode3 = `division = 3 / 2		    # 나눗셈
subtraction = 5 - 2		    # 뺄셈
addition = 1 + 2		    # 덧셈
multiplication = 3 * 4	    # 곱셈
modulo = 7 % 3		        # 나눗셈 후 나머지`

export const ExampleCode4 = `# Boolean은 참 또는 거짓 값을 나타냅니다
var_false = False
var_true = True

# 변수를 포함한 여러 값을 비교할 수 있으며, 두 값이 같은지 비교한 결과는 Boolean 반환됩니다.
two = 2
three = 3

is_equal = two == three	    # 두 값이 같음
not_equal = two != three	# 두 값이 같지 않음`

export const ExampleCode5 = `hello = "Hello"
world = "World"
hello_world = hello + ", " + world 	# 문자열 합치기
hello_hello = hello * 10		    # 문자열 반복
h = hello[0]				        # 특정 문자 선택, 문자열 위치는 0부터 시작합니다
e = hello[1]				        # 원하는 위치를 "[ ]" 안에 넣습니다
o = hello[-1]				        # 위치를 음수로 주면, 뒤에서 부터 세어 반환합니다`

export const ExampleCode6 = `list = [1, 2, 3]		# 리스트 정의
list.append(4)		    # 리스트에 4 추가
three = list[2]		    # 리스트의 특정 위치 값 선택
one = list[0]		    # 문자열과 마찬가지로 위치는 0부터 시작합니다
four = list[-1]		    # append() 이후엔 해당 리스트 변수에는 추가된 값이 남아있습니다
length = len(list)	    # len()은 리스트에 들어있는 값의 개수를 반환합니다`

export const ExampleCode7 = `if (1 == 2):				        # 확인하고 싶은 조건을 "if ()" 안에 넣습니다
	print("1 is equal to 2")		# 위의 조건이 참일 경우 실행할 코드를 tab을 눌러 들여쓰기한 후 작성합니다
else:					            # 위의 조건이 아닐 경우도 처리하고 싶다면 else를 사용합니다
	print("1 is not equal to 2")	# if의 조건이 아닐 경우 실행할 코드를 들여쓰기한 후 작성합니다

abc = ["a", "b", "c"]
if (len(abc) == 1):				    # if 안에 복잡한 조건을 작성할 수도 있습니다
	print("length is 1”)
elif (len(abc) == 2):				# elif 는 if 가 아닐 경우 다음 조건을 확인하고 코드를 실행합니다
	print("length is 2")
elif (len(abc) == 3):				# elif 를 여러 번 사용할 수도 있습니다
	print("length is 3")
else:						        # 앞에 있는 조건들이 모두 거짓이면 else 뒤의 들여쓰기 된 코드가 실행됩니다.
	print("length is more than 3")`
