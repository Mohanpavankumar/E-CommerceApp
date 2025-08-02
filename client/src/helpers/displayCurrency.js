const displayCurrency = (num) => {
    const formater = new Intl.NumberFormat('en-IN',{
        style : "currency",
        currency : "USD",
        minimumFractionDigits : 2
    })

    return formater.format(num)
}

export default displayCurrency