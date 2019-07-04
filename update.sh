
#scp -r ../mljs xugang@172.22.220.21:/home/xugang

time=`date`
echo $time

git add -u .
git commit -m '$time'
git push origin master


