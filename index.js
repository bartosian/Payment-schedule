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

    calculatePaymentsQuantity() {
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
    }

    roundNumber(num, length) {
        var newNumber = Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
        return newNumber;
    }





}