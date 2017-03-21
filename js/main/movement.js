function Movement(amount, description, date) {
    this.amount = amountOrDefault(amount);
    this.description = descriptionOrDefault(description);
    this.date = dateOrDefault(date);

    function amountOrDefault(amount) {
        return stringToMoney(amount);
    }

    function descriptionOrDefault(description) {
        return description;
    }

    function dateOrDefault(date) {
        return stringToDate(date);
    }
}
