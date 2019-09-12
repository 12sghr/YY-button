#coding:utf-8
import glob
import json
import os

# 追記
new_voices = []
present_voices = []

for x in sorted(glob.glob("./public/voices/*/*")):
    new_voices.append(x)

json_open = open('./public/voices_list.json','r')
present_voices = json.load(json_open)

new_voices_num = len(new_voices)
present_voices_num = len(present_voices)

for i in range(present_voices_num):
    present_voices.append("{'id': '', 'title': '', 'src': ''}")

for i, elem in enumerate(new_voices):
    f = open('voices_new_list.txt','a')
    f.write(elem + '\n')
    f.close()
os.rename('voices_new_list.txt', 'voices_list.txt')

out_new_voices = []
for i in range(new_voices_num):
    out_new_voice = {}
    out_new_voice['id'] = str(i)
    out_new_voice['series'] = new_voices[i][16:-4].split('/')[0]
    out_new_voice['title'] = new_voices[i][16:-4].split('/')[1]
    out_new_voice['src'] = new_voices[i][8:]
    out_new_voices.append(out_new_voice)
print(out_new_voices)
out_json_file = open('public/voices_new_list.json', 'w')
json.dump(out_new_voices, out_json_file, ensure_ascii=False, indent=2)
os.rename('public/voices_new_list.json', 'public/voices_list.json')
