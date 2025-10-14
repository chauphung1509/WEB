function find_fib(n)
{
    if (n<=2) return 1;
    else return find_fib(n-1)+find_fib(n-2);

}