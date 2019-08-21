#coding:utf-8
import glob
import os

# 追記
new_voices = []
present_voices = []

for x in sorted(glob.glob("./voices/*")):
    print(x)
    new_voices.append(x)

with open('./voices_list.txt','r') as f:
    for row in f:
        print(row)
        present_voices.append(row)

new_voices_num = len(new_voices)
present_voices_num = len(present_voices)

if new_voices_num != present_voices_num:
    for i in range(new_voices_num - present_voices_num):
        present_voices.append("")

    for i, elem in enumerate(new_voices):
        if present_voices[i] != elem:
            f = open('voices_new_list.txt','a')
            f.write(elem + '\n')
            f.close()
    os.rename("voices_new_list.txt", "voices_list.txt")

    html = '''\
<html>
    <head>
        <meta charset="utf-8"/>
        <title>わいわいボタン</title>
        <link rel="stylesheet" type="text/css" href="/index.css">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js"></script>
        <script src="/index.js"></script>
    </head>

    <body>
        <h1 id="title">わいわいボタン</h1>
        <p>ボタンを押すと対応したわいわいさんの声が流れます。</p>

'''
    rear_html = '''\
    <h1 id="history">更新履歴</h1>
    <p>2019.8.22 公開</p>
    <h1>ソース</h1>
    <a href="#">GitHub</a>
    </body>
</html>
'''



    html_new_voices = []

    for x in new_voices:
        html_new_voices.append('''\
        <button type='button' id='play'> %s </button>
        <audio id='sound' preload="auto" src="%s" type="audio/mp3"></audio>
''' % (x, x))

    middle_html = ''.join(html_new_voices)
    f = open('YY_button.html', 'w')
    f.write(html + middle_html + rear_html + '\n')
    f.close()
