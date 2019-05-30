for i in `ls`;
do echo $i;
docker cp $i hub_server8:/app/mljs ;
done;



