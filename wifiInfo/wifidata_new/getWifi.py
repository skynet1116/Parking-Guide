import re
name=['lcation'+str(i) for i in range(1,31)]
for location in name:
    with open(location, 'r') as f:
        print('[',end='')
        for line in f.readlines():
            if '{' in line or '}' in line:
                pass
            else:
                ignore=['\t',' ','%',',','\"']
                for _ in ignore:
                    line.replace(_,'')
                #s=re.split('\n|\t|"|',line)
                pattern = re.compile("(?<=\").*?(?=\")")
                info=pattern.findall(line)
                id=info[0]
                s=info[-1].replace('%','')
                print('{id:"'+id+'",strength:'+s+'},',end='')
        print('],')

