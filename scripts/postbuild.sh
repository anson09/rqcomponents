#!/usr/bin/env bash
set -euo pipefail

FILELIST=(`ls lib/theme/*.css`)

for FILE in ${FILELIST[@]}
do
    echo "$(sed -e '/:root/d' -e /^$/d $FILE)" > $FILE
done