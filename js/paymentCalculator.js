class PaymentCalculator {

    constructor(startDate,
                loanAmount,
                insAmount,
                SIR,
                instInt) {
        this.startDate = startDate;
        this.loanAmount = loanAmount;
        this.insAmount = insAmount;
        this.SIR = SIR;
        this.instInt = instInt;
        this.daysInYear = 360;
        this.IntNum = instInt === "Daily" ? 1 : instInt === "Weekly" ? 7 : 30;
    }

    calculateDaysQuantityWithoutInt() {
       const quantityWithoutInterest = Math.ceil(this.loanAmount / this.insAmount); // payments quantity without interest
       let payoutTimeWithoutInterest; // days quantity without interest

       switch(this.instInt) {
           case "Daily":
               payoutTimeWithoutInterest = quantityWithoutInterest;
               break;
           case "Monthly":
               payoutTimeWithoutInterest = quantityWithoutInterest * 30;
               break;
           case "Weekly":
               payoutTimeWithoutInterest = quantityWithoutInterest * 7;
               break;
       }

       return payoutTimeWithoutInterest;
    }

    calculateDaysQuantityWithInt() {
        const quantityWithInterest = Math.ceil(this.totalAmountWithInterest / this.insAmount);// payments quantity with interest
        let payoutTimeWithInterest;

        switch(this.instInt) {
            case "Daily":
                payoutTimeWithInterest = quantityWithInterest;
                break;
            case "Monthly":
                payoutTimeWithInterest = quantityWithInterest * 30;
                break;
            case "Weekly":
                payoutTimeWithInterest = quantityWithInterest * 7;
                break;
        }

        return payoutTimeWithInterest;
    }

    // Static method to round numbers
    static roundNumber(num, length) {
        return  Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
    }

    // Method to generate schedule
    generateSchedule() {
        const firstRow = `
                     <tr>
                        <td>${this.startDate}</td>
                        <td>-</td>
                        <td>${this.totalAmountWithInterest}</td>
                    </tr>`;
        const paymentsQuantity = this.calculateDaysQuantityWithInt() / this.instInt;
        let totalSum = this.totalAmountWithInterest;
    }

    // Daily rate
    get dailyRate() {
        return this.roundNumber(this.SIR / this.daysInYear, 2);
    }

    // Interest amount
    get sumInterest() {
        return this.dailyRate * this.calculateDaysQuantityWithoutInt();
    }

    // Total amount with interest
    get totalAmountWithInterest() {
        return this.loanAmount + this.sumInterest + this.lastPayment;
    }

    // Lat payment amount
    get lastPayment() {
        return (this.calculateDaysQuantityWithInt() - this.calculateDaysQuantityWithoutInt()) * this.dailyRate;
    }


}