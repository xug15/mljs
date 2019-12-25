open DATA, "<$ARGV[0]";
system("mkdir new");
open OUT, ">new/$ARGV[0]";
while(<DATA>)
{
    $_=~s/__liqDB__BBCancer__label/__liqDB__label/g;
    print OUT $_;
}

