class Calculator {

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
    }

    createPaymentSchedule() {
        let totalPayments;
        let totalAmount;

        switch(this.instInt) {
            case "Daily": {
                totalPayments = this.loanAmount / this.insAmount;
                totalInterestAmount = (totalPayments / 361) * (this.SIR / 100);
                break;
            } case "Weekly": {

                break;
            } case "Monthly": {
                break;
            }
        }
    }
}