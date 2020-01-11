time=`date`
echo $time

#cd teaching_book

#git pull
git reset HEAD~
git add -u .
git add *
git commit -m '$time'
git push -f origin master


