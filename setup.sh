#!/usr/bin/env bash
echo ".................................."
echo "...............START..............."
echo ".................................."
from=.env.sample
declare -a List=(
                 "env"
                )
for env in "${List[@]}"
do
	to=".$env"
	if test -f $to; then
    echo "$to file exist. You need to add new config lines if needed manually."
  else
		echo -e "Copy $from to $to"
		search="ENV_NAME"
		replace="$env"
		sed "s/$search/$replace/g" $from > $to
	fi
done

echo -e "Copy firebaseServiceAccountKey.sample.json to firebaseServiceAccountKey.json"
cp "firebaseServiceAccountKey.sample.json" "firebaseServiceAccountKey.json"
echo ".................................."
echo "You must replace firebaseServiceAccountKey.json with your service account key in firebase console."
echo "..............WARNING............."
echo "To allow setup on heroku you must set these ENV params"
cat $from
echo "...............DONE..............."
echo ".................................."
