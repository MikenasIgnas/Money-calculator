export {};

const incomeInput = document.getElementById('incomeInput') as HTMLInputElement;
const rentCostInput = document.getElementById('rentCostInput') as HTMLInputElement;
const taxesInput = document.getElementById('taxesInput') as HTMLInputElement;
const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const minimalWage: number = 730;

submitButton.addEventListener('click', () => {
  const calculateNPD = () => {
    if (parseFloat(incomeInput.value) <= minimalWage) {
      const NPD1:number = 540;
      return NPD1;
    }
    if (parseFloat(incomeInput.value) > minimalWage) {
      if (parseFloat(incomeInput.value) <= 1704) {
        const NPD2:number = 540 - 0.34 * (parseFloat(incomeInput.value) - 730);
        return NPD2;
      }
      if (parseFloat(incomeInput.value) > 1704) {
        const NPD3:number = 400 - (0.18 * (parseFloat(incomeInput.value) - 642));
        return NPD3;
      }
    }
  };
  const npdCalculator:any = calculateNPD();

  const calculateGPM = () => {
    const incomeTax: number = ((parseFloat(incomeInput.value) - npdCalculator) * 20) / 100;
    return incomeTax;
  };
  const gpmCalculator = calculateGPM();

  const calculateSDR = () => {
    const healthInsurance: number = (parseFloat(incomeInput.value) * 6.98) / 100;
    return healthInsurance;
  };
  const healthInsuranceCalculator = calculateSDR();

  const calculateVSD = () => {
    const nationalInsurance: number = (parseFloat(incomeInput.value) * 12.52) / 100;
    return nationalInsurance;
  };
  const nationalInsuranceCalculator = calculateVSD();

  const calculateRent = () => {
    const rentMoney: number = parseFloat(rentCostInput.value);
    return rentMoney;
  };
  const rentCalculator = calculateRent();

  const calculateUtilityTaxes = () => {
    const utilityTaxes: number = parseFloat(taxesInput.value);
    return utilityTaxes;
  };
  const utilityTaxesCalculator = calculateUtilityTaxes();

  const calculateTotal = () => {
    const leftTotal: number = (parseFloat(incomeInput.value) - (gpmCalculator + healthInsuranceCalculator + nationalInsuranceCalculator)) - (rentCalculator + utilityTaxesCalculator);
    return leftTotal;
  };
  const totalLeftCalculator = calculateTotal();
  if (incomeInput.value !== '' && rentCostInput.value !== '' && taxesInput.value !== '') {
    const labels: string[] = [
      'Tax-free amount of income(NPD)',
      'Income tax(GPM)',
      'Compulsory health insurance(Sodra)',
      'National social insurance(VSD)',
      'Housing Rent',
      'Utility Taxes',
      'Total Left',
    ];

    const data = {
      labels,
      datasets: [
        {
          label: 'Money calculator',
          data: [
            npdCalculator,
            gpmCalculator,
            healthInsuranceCalculator,
            nationalInsuranceCalculator,
            rentCalculator,
            utilityTaxesCalculator,
            totalLeftCalculator,
          ],
          backgroundColor: [
            'rgba(255, 26, 104, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(0, 0, 0, 0.2)',
          ],
          borderColor: [
            'rgba(255, 26, 104, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(0, 0, 0, 1)',
          ],
        },
      ],
    };

    const config = {
      type: 'pie',
      data,
      options: {
      },
    };
    const myChart = new Chart(
      document.getElementById('myChart'),
      config,
    );
  } else {
    const addStyle = (inputName: { style: { borderBottom: string; }; }) => {
      inputName.style.borderBottom = '2px solid red';
    };
    addStyle(incomeInput);
    addStyle(rentCostInput);
    addStyle(taxesInput);

    const removeStyle = (inputName: { addEventListener: (arg0: string, arg1: () => void) => void; style: { borderBottom: string; }; }) => {
      inputName.addEventListener('keydown', () => {
        inputName.style.borderBottom = '1px solid black';
      });
    };
    removeStyle(incomeInput);
    removeStyle(rentCostInput);
    removeStyle(taxesInput);
  }
});
