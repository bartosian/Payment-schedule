window.onload = () => {
    const form = document.getElementById("main-form");
    const schedule = document.getElementById("schedule");
    const CalcButton = document.getElementById("calcBtn");
    const DateInput = document.getElementById("date");
    const LoanInput = document.getElementById("Loan_Amount");
    const Installment_Amount = document.getElementById("Installment_Amount");
    const Interest_Rate = document.getElementById("Interest_Rate");
    const Inst_interval = document.getElementById("inst_int");
    let calculator;

    function getUserData(e) {
        e.preventDefault();

        let userData = {
            startDate: new Date(DateInput.value),
            loanAmount: +LoanInput.value,
            insAmount: +Installment_Amount.value,
            SIR: +Interest_Rate.value,
            instInt: Inst_interval.value
        };

        calculator = new PaymentCalculator(userData);

        form.style.display = "none";
        schedule.style.display = "block";
    }



    CalcButton.addEventListener("click", getUserData, false);
};