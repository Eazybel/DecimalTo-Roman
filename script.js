// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Get references to the HTML elements
    const decimalInput = document.getElementById('decimalInput');
    const convertButton = document.getElementById('convertButton');
    const resultContainer = document.getElementById('resultContainer');
    const romanResult = document.getElementById('romanResult');
    const errorMessage = document.getElementById('errorMessage');

    /**
     * Converts a decimal number to its Roman numeral representation.
     * Handles numbers from 1 to 3999.
     * @param {number} num - The decimal number to convert.
     * @returns {string} The Roman numeral string or an error message.
     */
    function convertDecimalToRoman(num) {
        // Define the Roman numeral mapping in descending order of value
        const romanMap = [
            { value: 1000, symbol: 'M' },
            { value: 900, symbol: 'CM' },
            { value: 500, symbol: 'D' },
            { value: 400, symbol: 'CD' },
            { value: 100, symbol: 'C' },
            { value: 90, symbol: 'XC' },
            { value: 50, symbol: 'L' },
            { value: 40, symbol: 'XL' },
            { value: 10, symbol: 'X' },
            { value: 9, symbol: 'IX' },
            { value: 5, symbol: 'V' },
            { value: 4, symbol: 'IV' },
            { value: 1, symbol: 'I' }
        ];

        let result = ''; // Initialize an empty string to build the Roman numeral

        // Iterate through the romanMap
        for (let i = 0; i < romanMap.length; i++) {
            const { value, symbol } = romanMap[i];

            // While the number is greater than or equal to the current Roman value,
            // append the symbol to the result and subtract the value from the number.
            while (num >= value) {
                result += symbol;
                num -= value;
            }
        }
        return result; // Return the final Roman numeral string
    }

    /**
     * Validates the input number and performs the conversion.
     */
    function handleConversion() {
        // Clear previous results and error messages
        romanResult.textContent = '';
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
        resultContainer.classList.add('hidden');

        const inputValue = decimalInput.value.trim(); // Get the input value and remove leading/trailing whitespace
        const decimalNumber = parseInt(inputValue, 10); // Parse the input as an integer

        // Input validation
        if (inputValue === '') {
            errorMessage.textContent = 'Please enter a number.';
            errorMessage.classList.remove('hidden');
            resultContainer.classList.remove('hidden'); // Show container even for errors
            return;
        }

        if (isNaN(decimalNumber)) {
            errorMessage.textContent = 'Invalid input. Please enter a valid number.';
            errorMessage.classList.remove('hidden');
            resultContainer.classList.remove('hidden');
            return;
        }

        // Roman numerals typically represent numbers from 1 to 3999
        if (decimalNumber < 1 || decimalNumber > 3999) {
            errorMessage.textContent = 'Please enter a number between 1 and 3999.';
            errorMessage.classList.remove('hidden');
            resultContainer.classList.remove('hidden');
            return;
        }

        // Perform the conversion
        const roman = convertDecimalToRoman(decimalNumber);

        // Display the result
        romanResult.textContent = roman;
        resultContainer.classList.remove('hidden');
    }

    // Add event listener to the convert button
    convertButton.addEventListener('click', handleConversion);

    // Optional: Allow conversion on "Enter" key press in the input field
    decimalInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleConversion();
        }
    });
});
