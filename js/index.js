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
    }

    calculateDaysQuantityWithoutInt() {
       const quantityWithoutInterest = Math.ceil(this.loanAmount / this.insAmount);
       let payoutTimeWithoutInterest;

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
        const quantityWithInterest = Math.ceil(this.totalAmountWithInterest / this.insAmount);
        let payoutTimeWInterest;

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

    static roundNumber(num, length) {
        return  Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
    }

    get dailyRate() {
        return this.roundNumber(this.SIR / this.daysInYear, 2);
    }

    get sumInterest() {
        return this.dailyRate * this.calculateDaysQuantityWithoutInt();
    }

    get totalAmountWithInterest() {
        return this.loanAmount + this.sumInterest;
    }

    get lastPayment() {
        return (this.calculateDaysQuantityWithInt() - this.calculateDaysQuantityWithoutInt()) * this.dailyRate;
    }


}