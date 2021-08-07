import json
import re
from textwrap import shorten


def sorted_dict(dict_obj):
    """Sắp xếp key trong Dict"""
    sorted_items = sorted(dict_obj.items(), key=lambda i: i[1])
    return {key: value for key, value in sorted_items}



# Paste dữ liệu từ website
text = '''0 – «нуль» or «ноль»

1 – «один» or «одна» or «одно» or «одни»

2 – «два» or «две»

3 – «три»

4 – «четыре»

5 – «пять»

6 – «шесть»

7 – «семь»

8 – «восемь»

9 – «девять»

10 – «десять»

11 – «одиннадцать»

12 – «двенадцать»

13 – «тринадцать»

14 – «четырнадцать»

15 – «пятнадцать»

16 – «шестнадцать»

17 – «семнадцать»

18 – «восемнадцать»

19 – «девятнадцать»

20 – «двадцать»

21 – «двадцать один/одна/одно»

22 – «двадцать два/две»

23 – «двадцать три»

24 – «двадцать четыре»

25 – «двадцать пять»

26 – «двадцать шесть»

27 – «двадцать семь»

28 – «двадцать восемь»

29 – «двадцать девять»

30 – «тридцать»

31 – «тридцать один/одна/одно»

32 – «тридцать два/две»

33 – «тридцать три»

34 – «тридцать четыре»

35 – «тридцать пять»

36 – «тридцать шесть»

37 – «тридцать семь»

38 – «тридцать восемь»

39 – «тридцать девять»

40 – «сорок»

41 – «сорок один/одна/одно»

42 – «сорок два/две»

43 – «сорок три»

44 – «сорок четыре»

45 – «сорок пять»

46 – «сорок шесть»

47 – «сорок семь»

48 – «сорок восемь»

49 – «сорок девять»

50 – «пятьдесят»

51 – «пятьдесят один/одна/одно»

52 – «пятьдесят два/две»

53 – «пятьдесят три»

54 – «пятьдесят четыре»

55 – «пятьдесят пять»

56 – «пятьдесят шесть»

57 – «пятьдесят семь»

58 – «пятьдесят восемь»

59 – «пятьдесят девять»

60 – «шестьдесят»

61 – «шестьдесят один/одна/одно»

62 – «шестьдесят два/две»

63 – «шестьдесят три»

64 – «шестьдесят четыре»

65 – «шестьдесят пять»

66 – «шестьдесят шесть»

67 – «шестьдесят семь»

68 – «шестьдесят восемь»

69 – «шестьдесят девять»

70 – «семьдесят»

71 – «семьдесят один/одна/одно»

72 – «семьдесят два/две»

73 – «семьдесят три»

74 – «семьдесят четыре»

75 – «семьдесят пять»

76 – «семьдесят шесть»

77 – «семьдесят семь»

78 – «семьдесят восемь»

79 – «семьдесят девять»

80 – «восемьдесят»

81 – «восемьдесят один/одна/одно»

82 – «восемьдесят два/две»

83 – «восемьдесят три»

84 – «восемьдесят четыре»

85 – «восемьдесят пять»

86 – «восемьдесят шесть»

87 – «восемьдесят семь»

88 – «восемьдесят восемь»

89 – «восемьдесят девять»

90 – «девяносто»

91 – «девяносто один/одна/одно»

92 – «девяносто два/две»

93 – «девяносто три»

94 – «девяносто четыре»

95 – «девяносто пять»

96 – «девяносто шесть»

97 – «девяносто семь»

98 – «девяносто восемь»

99 – «девяносто девять»

100 – «сто»'''
print("1. Đoạn dữ liệu gốc:\t\t", shorten(repr(text), 100))

# Tách giá trị thành kiểu <chữ>:<số>
numbers_text = dict([line.split(' – ')[::-1] for line in text.split('\n\n')])
numbers_text = {key: int(value) for key, value in numbers_text.items()}
print("2. Phân loại chữ theo giá trị:\t", shorten(repr(numbers_text), 100))

# Bỏ '«»'
numbers_text = {re.sub('«|»', '', key): value for key, value in numbers_text.items()}
print("3. Bỏ '«»':\t\t\t", shorten(repr(numbers_text), 100))

# Tách ' or ' ra
for key, value in list(numbers_text.items()):
    if ' or ' in key:
        for new_key in key.split(' or '):
            numbers_text[new_key] = value
        del numbers_text[key]
numbers_text = sorted_dict(numbers_text)
print("3. Tách ' or ':\t\t\t", shorten(repr(numbers_text), 100))

# Tách '/' ra
print("4. Tách '/':")
test_value = 21
for key, value in numbers_text.items():
    if value == test_value:
        print("\t4.1. Trước khi tách:\t", f"'{key}': {value}")
        break 
for key, value in list(numbers_text.items()):
    if '/' in key:
        first, last = key.split()
        for last_i in last.split('/'):
            numbers_text[f"{first} {last_i}"] = value
        del numbers_text[key]
numbers_text = sorted_dict(numbers_text)
print("\t4.2. Sau khi tách:\t", end=' ')
for key, value in numbers_text.items():
    if value == test_value:
        print(f"'{key}': {value}", end=' ')
print()

# Xuất JSON
filename = 'data.json'
json.dump(numbers_text, open(filename, 'w+', encoding='utf-8'))
print(f"Đã xuất ra {filename}!")
