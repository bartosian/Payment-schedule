
class PaymentCalculator {


    constructor(data) {
        this.startDate = data.startDate;
        this.loanAmount = data.loanAmount;
        this.insAmount = data.insAmount;
        this.SIR = data.SIR;
        this.instInt = data.instInt;
        this.daysInYear = 365;
        this.IntNum = data.instInt === "Daily" ? 1 : data.instInt === "Weekly" ? 7 : 30;
    }

    calculateDaysQuantityWithoutInt() {
       const quantityWithoutInterest = Math.ceil(this.loanAmount / this.insAmount); // payments quantity without interest
       let payoutTimeWithoutInterest = quantityWithoutInterest * this.IntNum; // days quantity without interest

       return payoutTimeWithoutInterest;
    }


    // Static method to round numbers
    static roundNumber(num, length) {
        return  Math.round(num * Math.pow(10, length)) / Math.pow(10, length);
    }

    // Total interest amount
    get interestAmount() {
        return PaymentCalculator.roundNumber(this.loanAmount * (this.SIR / 100) * (this.calculateDaysQuantityWithoutInt()/this.daysInYear), 2);
    }
    // Payments days quantity for Interest
    calculateDaysQuantityForInterest() {
        const quantityForInterest = Math.ceil(this.interestAmount / this.insAmount); // payments quantity for interest
        let payoutForInterest = quantityForInterest * this.IntNum; // days quantity for interest

        return payoutForInterest;
    }

    // Total interest amount
    get lastPayment() {
        return PaymentCalculator.roundNumber(this.loanAmount * (this.SIR / 100) * (this.calculateDaysQuantityForInterest()/this.daysInYear), 2);
    }
    // Total days for loan
    get totalDaysQuantity() {
        return this.calculateDaysQuantityWithoutInt() + this.calculateDaysQuantityForInterest();
    }

    // Total amount with interest
    get totalLoanAmount() {
        return this.loanAmount + this.interestAmount + this.lastPayment;
    }

    generateSchedule() {
        let table = document.getElementById("main-table");
        let tableBody = document.createElement("tbody");
        let paymentsQuantity = this.instInt === "Daily" ? this.totalDaysQuantity : this.inst === "Weekly" ? Math.ceil(this.totalDaysQuantity / 7) : Math.ceil(this.totalDaysQuantity / 30);

        const initialRow = `
                    <tr>
                        <td>${ this.startDate.toLocaleDateString() }</td>
                        <td>Nothing to pay</td>
                        <td>${ this.totalLoanAmount }</td>
                    </tr>
        `;

        tableBody.innerHTML = initialRow;

        for(let i = 1; i < paymentsQuantity; i++) {
            let date = this.startDate.getMonth() + i;
            let newDate = new Date(new Date(this.startDate).setMonth(date)).toDateString();

            let payRow = `
                    <tr>
                        <td>${ newDate }</td>
                        <td>${ this.insAmount }</td>
                        <td>${ PaymentCalculator.roundNumber(this.totalLoanAmount - this.insAmount * i, 2)}</td>
                    </tr>
        `;

            tableBody.innerHTML += payRow;
        }

        const lastPayment = this.totalLoanAmount - this.insAmount * (paymentsQuantity - 1);
        let date = this.startDate.getMonth() + paymentsQuantity;
        let newDate = new Date(new Date(this.startDate).setMonth(date)).toDateString();
        const lastPay = `
                    <tr class="last-payment">
                        <td>${ newDate }</td>
                        <td>LAST PAYMENT: ${ PaymentCalculator.roundNumber(lastPayment, 2) }</td>
                        <td>Nothing to pay</td>
                    </tr>
        `;

        tableBody.innerHTML += lastPay;
        table.appendChild(tableBody);
    }
}