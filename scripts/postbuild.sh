#!/usr/bin/env bash
set -euo pipefail

FILELIST=(`ls lib/theme/*.css`)

for FILE in ${FILELIST[@]}
do
    echo "$(sed -e '/:root/d' -e /^$/d $FILE)" > $FILE
done

echo -e "\n------ bundle size ------"
ls -lh lib/*|awk '{printf "%s\t%s\n",$5,$9}'|egrep -v '^\t|map$'|sort -rh
echo "------ ----------- ------"