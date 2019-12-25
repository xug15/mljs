
# javascript ajax
```js
$.ajax({
                        url:'script/ajax/regulation3.php',
                        dataType:'json',
                        type:'POST',
                        data:'key=' + key+ "&method=" + method +"&table=" + species+'_'+method + "&selectType="+ functionName
+ "&searchID=" + searchID +"&species=" + species+"&total="+search_total,
                        error:function(jqXHR, textStatus, errorThrown)
                        {
                                alert("jqXHR:"+jqXHR+"\ntextStatus:"+textStatus+"\nerrorThrown:"+errorThrown);
                        },
                        success:function(response)
                        {
                                if (response.code){
                                        $('.well').css({background:"rgb(203,220,237)"});
                                        $(".input").hide();
                                        var data = response.data[0][0];
                                }
                        }
});
```



```php
<?php



require_once('mysql/mysql_connect.php');

    $msgArray = array('code'=>0, 'data'=>array(), 'message'=>'参数接收错误，请关闭浏览器后重试。');
	$key = isset($_POST['key']) ? trim($_POST['key']) : null;
	$species = isset($_POST['species']) ? trim($_POST['species']) : null;
	$searchID = isset($_POST['searchID']) ? trim($_POST['searchID']) : null;
	$module = isset($_POST['module']) ? trim($_POST['module']) : null;
	$table = isset($_POST['table']) ? trim($_POST['table']) : null;
	$selectType = isset($_POST['selectType']) ? trim($_POST['selectType']) : null;
	$method = isset($_POST['method']) ? trim($_POST['method']) : null;
	$total= isset($_POST['total']) ? trim($_POST['total']) : trim($_GET['total']);

	//$clipdb=" select geneName,geneID,geneType,geneName,count(RBP) as num  ";
	//$eclip=" select geneName,geneID,geneType,geneName,count(RBP) as num ";
	//$pip=" select geneName,geneID,geneType,geneName,count(RBP) as num ";


	$clipdb=" select geneName,geneID,geneType,geneName,count(distinct geneName,geneID,geneType,geneName,RBP,l1) as num  ";
	$eclip=" select geneName,geneID,geneType,geneName,count(distinct geneName,geneID,geneType,geneName,RBP,l1) as num ";
	$pip=" select geneName,geneID,geneType,geneName,count(distinct geneName,geneID,geneType,geneName,RBP,l1) as num ";

	$deepbind="select geneName,geneID,geneType,geneName,count(RBP) as num ";
	$fimo="select geneName,geneID,geneType,geneName,count(RBP) as num ";
	$tess="select geneName,geneID,geneType,geneName,count(RBP) as num ";


	// map inputKey to tableKey
	if ($method != 'pip'){
		$tableKey = getRBPbyGene("inputName = '{$key}'","tableName",$species."_RBP_map");
		if(is_array($tableKey) && isset($tableKey[0][0])){
			$key = $tableKey[0][0];
		}
	}




	$where = " from {$table} where RBP= '{$key}' group by geneName ";

	if (strstr($searchID,"searchRBPbinding")){
		if ($method != 'pip'){
			$tableKey = getRBPbyGene("inputName = '{$key}'","tableName",$species."_RBP_map");

			if($total=="yes"){

				$union=" select geneName,geneID,geneType,geneName,count(distinct geneName,geneID,geneType,geneName,RBP,l1) as num   from {$species}_clipdb where RBP= '{$key}' group by geneName ";
				if($species=="human"){
					$union=" select geneName,geneID,geneType,geneName,count(distinct geneName,geneID,geneType,geneName,RBP,l1) as num   from {$species}_clipdb_eclip where RBP= '{$key}' group by geneName ";
				}
				//echo $union."union<br>";
				$response =  array(getRBPbyRBP("select RBP,geneID,domainNumber,domainCount, RBP, RBP from {$species}_RBPanno where RBP= '{$key}' "),getRBPbyRBP($union),getRBPbyRBP("select ontology,GOid,GOterm from {$species}_GO where RBP= '{$key}' "));
			}else{
				$response =  array(getRBPbyRBP("select RBP,geneID,domainNumber,domainCount, RBP, RBP from {$species}_RBPanno where RBP= '{$key}' "),getRBPbyRBP(${$selectType}.$where),getRBPbyRBP("select ontology,GOid,GOterm from {$species}_GO where RBP= '{$key}' "));
			}
		}else{
			$tableKey = $key;
			$response =  array(0,getRBPbyRBP(${$selectType}.$where),0 );

		}
		if(is_array($response[1]) && isset($response[1][0]['geneName'])){
			$msgArray = array('code'=>1, 'data'=>$response, 'message'=>'success');
		}else{
			$msgArray = ${$selectType}.$where;
		}
	}
	if (strstr($searchID,"searchGO")){
		$response =  getRBPGO($key,$module,$species);
		if(is_array($response) && isset($response[0]['GOid'])){
			$msgArray = array('code'=>1, 'data'=>$response, 'message'=>'success');
		}
	}
	if (strstr($searchID,"searchPathway")){
		$response =  getRBPpathway($key,$module,$species);
		if(is_array($response) && isset($response[0]['pathway'])){
			$msgArray = array('code'=>1, 'data'=>$response, 'message'=>'success');
		}
	}

/*
file_put_contents("/tmp/test.txt", "This is another something.\n");
file_put_contents("/tmp/test.txt", var_export($msgArray,true), FILE_APPEND|LOCK_EX);
exec("mv /tmp/test.txt /var/www/html/postar/browse");
*/
	echo json_encode($msgArray);

?>

```

```php
<?php

ini_set('memory_limit', '1024M');

        $db = new PDO('mysql:host=127.0.0.1;dbname=clipdb3', 'root', 'admin');

	$RBPbindingRBPclip = 'RBP_CLIPdb';
	$RBPbindingDeepbind = 'RBP_deepbind';
	$RBPbindingeclip = 'RBP_eCLIP';
	$RBPGO = 'GO';
	$RBPpathway = 'pathway';
	$ExpCoding = 'geneExp';

	$RBP_clipdb_RNAediting = '_RBP_CLIPdb_RNAediting';
	$RBP_deepbind_RNAediting = '_RBP_deepbind_RNAediting';
	$RBP_eclip_RNAediting = '_RBP_eclip_RNAediting';
	$RBP_clipdb_RNAmod = '_RBP_CLIPdb_RNAmod';
	$RBP_eclip_RNAmod = '_RBP_eclip_RNAmod';
	$RBP_deepbind_RNAmod = '_RBP_deepbind_RNAmod';
	$RBP_clipdb_ConStructure = '_RBP_clipdb_ConStructure';
	$RBP_eclip_ConStructure = '_RBP_eclip_ConStructure';
	$RBP_deepbind_ConStructure = '_RBP_deepbind_ConStructure';






	function getRBPGO($key,$module,$species){
        global $db, $RBPGO;
        $query = "select genomicContext,ontology,GOid,term  ,classic from ".$RBPGO." where RBP = '".$key."' and species = '".$species."' and module = '{$module}' ";
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
	}


	function getRBPpathway($key,$module,$species){
        global $db, $RBPpathway;
        $query = "select genomicContext,pathway,pvalue from ".$RBPpathway." where RBP = '".$key."' and species = '".$species."' and module = '{$module}' ";
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
	}




	function getExpCoding($name,$species){
        global $db;
        $query = "select * from ".$species."_geneExp where geneName = '".$name."' ";
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
	}

// rbp.html

	function getRBPbyRBP($query){
        global $db;
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
	}

// gene.html


	function getRBP_gene($where,$query1,$query2,$table){
        global $db;
        $query = "select  DISTINCT ".$query1.",".$query2." from ".$table." where ".$where;
        $result = $db->query($query);
        //$resultArray = $result->fetchAll();
        $resultArray = $result->fetchAll();
        return $resultArray;
	}

	function getRBP_gene_SNP($where,$query1,$query2,$table,$key,$method,$protocol){
        global $db;
        $query = "select DISTINCT $query1, $query2, SNPid  from (select $table.*, ifnull(human_eQTL.SNPid,'0')   as SNPid from $table left join human_eQTL on $table.myIDSNP = human_eQTL.SNPid where $table.geneName = '$key') as a ";
	if($method=="clipdb"){
        	$query = "select DISTINCT $query1, $query2 ,SNPid from (select $table.*,  ifnull(human_eQTL.SNPid,'0') as SNPid  from $table left join human_eQTL on $table.myIDSNP = human_eQTL.SNPid where $table.geneName = '$key' and $table.protocol = '$protocol') as a ";
	}
//return $query;
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
	}

	function getRBPbyGene($where,$query1,$table){
        global $db;
        $query = "select ".$query1." from ".$table." where ".$where;
        $result = $db->query($query);
        $resultArray = $result->fetchAll(PDO::FETCH_NUM);
        return $resultArray;
	}


	function getGeneMethod($key,$table,$where){
        global $db;
        $query = "select 1 from ".$table."  where ".$where."   geneName = '{$key}' limit 1";
        $result = $db->query($query);
        $resultArray = $result->fetchAll(PDO::FETCH_NUM);
	if(is_array($resultArray) && isset($resultArray[0][0])){
		return 1;
	}else{
		return 0;
	}

//        $resultArray = $result->fetchAll(PDO::FETCH_NUM);
//        return $resultArray;
	}


	function getRBPname($where,$query1,$table){
        global $db;
        $query = "select RBP from ".$table." where ".$where." group by RBP";
        $result = $db->query($query);
        $resultArray = $result->fetchAll(PDO::FETCH_NUM);
        return $resultArray;
        //return $query;
	}
// function gene

	function getRBP_gene_function($where,$query1,$query2,$table1,$table2){
        global $db;
        $query = "select DISTINCT $query1,$query2 from (select $table1.keyName, $table2.* from $table1 join $table2 on $table1.geneName = $table2.geneName  where $where) as a";
//return $query;
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
	}




?>
```
```sql
docker exec -it hub_server8 bash
mysql -uroot -padmin


#create database exrpanel;

use exrpanel;

create table gtf (
    transcript_index VARCHAR(100) ,
    Chr VARCHAR(100) ,
    Startp VARCHAR(100) ,
    Endp VARCHAR(100) ,	 
    Strand VARCHAR(100) ,
    Gene_id VARCHAR(100) ,
    Transcript_id VARCHAR(100) ,	
    Gene_type VARCHAR(100) ,	
    Gene_name VARCHAR(100) ,
    Transcript_type VARCHAR(100) ,	
    Transcript_name VARCHAR(100) ,
    index indexname (transcript_index)
)ENGINE=MYISAM CHARSET=utf8 ;


```

```sh
mysqlimport -u root -padmin -d --local --fields-terminated-by="\t" --lines-terminated-by="\n" exrpanel gtf.sql;

```

php/connect.php

```php
<?php
ini_set('memory_limit', '1024M');
$db = new PDO('mysql:host=127.0.0.1;dbname=exrpanel', 'root', 'admin');
$gtf='gtf';

header('content-type:application:json;charset=utf8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$msgArray = array('code'=>0, 'data'=>array(), 'message'=>'参数接收错误，请关闭浏览器后重试。');
$key = isset($_POST['key']) ? trim($_POST['key']) : trim($_GET['key']);

function gtfinfor($key){
        global $db, $gtf;
        $query = "select * from ".$gtf." where transcript_index = '".$key."'";
        //$query="select * from gtf where transcript_index='ENST00000516445'";
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
}
$response=gtfinfor($key);

echo json_encode($response);
?>

```

```js
function get_infor(key)
{
//var key="ENST00000384052";

var content=$.ajax({ 

    type:'GET',
    dataType:'json',
    url:'https://lulab.life.tsinghua.edu.cn/mljs/php/connect.php',
    data:'key=' + key,
    error:function(jqXHR, textStatus, errorThrown)
    {
        //alert("jqXHR:"+jqXHR+"\ntextStatus:"+textStatus+"\nerrorThrown:"+errorThrown);
        console.log("jqXHR:"+jqXHR+"\ntextStatus:"+textStatus+"\nerrorThrown:"+errorThrown);
    },
    success:function(response)
        {
        //console.log(response);

        //alert(response);
        return response;
    }
    })
    return content;
}
a=get_infor('ENST00000384052');

a["responseJSON"][0];

```

```sh
docker exec -it hub_server8 bash
mysql -uroot -padmin

```

```sql
use exrpanel;

create table clinical (
	transcript_index  VARCHAR(100),
	Entrez_Gene_ID  VARCHAR(100),
	HGNC_Symbol  VARCHAR(100),
	Biomarker_Name  VARCHAR(100),
	RNA_Type  VARCHAR(100),
	Specimen  VARCHAR(100),
	Function_txt  text,
	Expression  VARCHAR(100),
	Value_txt  VARCHAR(100),
	Early_Stage  VARCHAR(100),
	Etiology  VARCHAR(100),
	Cellular_Effect  VARCHAR(100),
	Usage_txt text,
	Sample_Size  text,
	Method  VARCHAR(100),
	PCR  text,
	qPCR_Reference  text,
	Region  VARCHAR(100),
	Single_Panel  VARCHAR(100),
	Reference  text,
	Journal  VARCHAR(100),
	PMID  VARCHAR(100),
	Publish_Year  VARCHAR(100),
	Cancer_Type  VARCHAR(100),
	index indexname (transcript_index)    
)ENGINE=MYISAM CHARSET=utf8 ;
```

clinical.sql

```txt
ENST00000361360	5455	POU3F3	POU3F3	lncRNA	plasma	ESCC vs Normal	up	diagnosis	Y	NA	NA	Plasma POU3F3 could serve as a potential biomarker for diagnosis of ESCC, and the combination of POU3F3 and SCCA was more efficient for ESCC detection, in particular for early tumor screening.	147 ESCC/123 Normal	qRT-PCR	SYBR®PremixEx Tag TM II(Takara:RR820A)	GAPDH	China	single	Identification of the long non-coding RNA POU3F3 in plasma as a novel biomarker for diagnosis of esophageal squamous cell carcinoma.	Molecular Cancer	25608466	2015	Esophagus_cancer
```

```sh
mysqlimport -u root -padmin -d --local --fields-terminated-by="\t" --lines-terminated-by="\n" exrpanel clinical.sql;
mysqlimport -u root -padmin -d --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.1.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.2.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.3.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.4.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.5.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.6.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.7.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.8.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.9.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.10.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.11.csv;
mysqlimport -u root -padmin --local --fields-terminated-by="," --lines-terminated-by="\n" exrpanel clinical.12.csv;
```

php/connect_clinical.php

```php
<?php
ini_set('memory_limit', '1024M');
$db = new PDO('mysql:host=127.0.0.1;dbname=exrpanel', 'root', 'admin');
$gtf='clinical';

header('content-type:application:json;charset=utf8');
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Methods:POST');
header('Access-Control-Allow-Headers:x-requested-with,content-type');

$msgArray = array('code'=>0, 'data'=>array(), 'message'=>'参数接收错误，请关闭浏览器后重试。');
$key = isset($_POST['key']) ? trim($_POST['key']) : trim($_GET['key']);

function gtfinfor($key){
        global $db, $gtf;
        $query = "select * from ".$gtf." where transcript_index = '".$key."'";
        //$query="select * from gtf where transcript_index='ENST00000516445'";
        $result = $db->query($query);
        $resultArray = $result->fetchAll();
        return $resultArray;
}
$response=gtfinfor($key);

echo json_encode($response);
?>
```