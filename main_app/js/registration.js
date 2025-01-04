// Indian states data
       const states = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "New Delhi", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    // Populate states dropdown
    const stateSelect = document.getElementById('state');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Navigation functions
    function showPage(pageNum) {
        document.querySelectorAll('.form-page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(`page${pageNum}`).classList.add('active');
    }

    function nextPage(currentPage) {
        if (validatePage(currentPage)) {
            showPage(currentPage + 1);
        }
    }

    function prevPage(currentPage) {
        showPage(currentPage - 1);
    }

    // Validation functions
    function validatePage(pageNum) {
        const page = document.getElementById(`page${pageNum}`);
        const inputs = page.querySelectorAll('input, select');
        let valid = true;

        inputs.forEach(input => {
            if (input.required && !input.value) {
                valid = false;
                input.style.borderColor = 'red';
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (pageNum === 3) {
            const acc = document.getElementById('accountNumber').value;
            const reAcc = document.getElementById('reAccountNumber').value;
            if (acc !== reAcc) {
                valid = false;
                alert('Account numbers do not match!');
            }
        }

        return valid;
    }

    // API functions
    async function submitOwnerDetails() {
        if (!validatePage(4)) return;

        const ownerData = {
            name: document.getElementById('name').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            bankName: document.getElementById('bankName').value,
            accountNumber: document.getElementById('accountNumber').value,
            ifscCode: document.getElementById('ifscCode').value,
            aadhar: document.getElementById('aadhar').value,
            pan: document.getElementById('pan').value,
            ownerStatus: 'active',
            DOB: document.getElementById('dob').value
        };

        try {
            const response = await fetch('https://backend-mymenu.onrender.com/api/owners', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ownerData)
            });

            if (!response.ok) throw new Error('Failed to submit owner details');

            const data = await response.json();
            localStorage.setItem('ownerData', JSON.stringify(ownerData));
            localStorage.setItem('ownerId', data._id);
            nextPage(4);
        } catch (error) {
            alert('Error submitting owner details: ' + error.message);
        }
    }

    async function submitStoreDetails() {
        if (!validatePage(6)) return;

        const ownerId = localStorage.getItem('ownerId');
        const storeData = {
            name: document.getElementById('storeName').value,
            address: `${document.getElementById('street').value}, ${document.getElementById('state').value}, ${document.getElementById('pinCode').value}`,
            numberOfProducts: parseInt(document.getElementById('numberOfProducts').value),
            priceRange: document.getElementById('priceRange').value,
            storeStatus: 'active'
        };

        try {
            const response = await fetch(`https://backend-mymenu.onrender.com/api/owners/${ownerId}/stores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(storeData)
            });

            if (!response.ok) throw new Error('Failed to submit store details');

            const data = await response.json();
            console.log('Store submission response:', data); 
            localStorage.setItem('storeData', JSON.stringify(storeData));
            localStorage.setItem('storeId', data.stores[0]._id); 
            setTimeout(() => {
                window.location.href = '/main_app/bulkproduct.html';
            }, 3000);
        } catch (error) {
            alert('Error submitting store details: ' + error.message);
        }
    }
    
    

    // Check for existing data
    window.onload = function() {
        const ownerData = JSON.parse(localStorage.getItem('ownerData'));
        if (ownerData) {
            Object.keys(ownerData).forEach(key => {
                const element = document.getElementById(key);
                if (element) element.value = ownerData[key];
            });
        }
    };

    function showLoader() {
        document.querySelector('.loader-overlay').style.display = 'flex';
    }

    function hideLoader() {
        document.querySelector('.loader-overlay').style.display = 'none';
    }

    function showAPILoader(button) {
        const span = button.querySelector('span');
        const loader = button.querySelector('.api-loader');
        span.style.opacity = '0.5';
        loader.style.display = 'inline-block';
    }

    function hideAPILoader(button) {
        const span = button.querySelector('span');
        const loader = button.querySelector('.api-loader');
        span.style.opacity = '1';
        loader.style.display = 'none';
    }

    async function sendOTP() {
        const button = document.querySelector('.next-btn');
        showAPILoader(button);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            document.querySelector('.otp-container').style.display = 'flex';
            hideAPILoader(button);
            setupOTPInputs();
        } catch (error) {
            hideAPILoader(button);
            document.querySelector('.retry-btn').style.display = 'inline-block';
        }
    }

    function setupOTPInputs() {
        const inputs = document.querySelectorAll('.otp-input');
        
        inputs.forEach((input, index) => {
            input.addEventListener('keyup', (e) => {
                if (e.key !== "Backspace" && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
                if (e.key === "Backspace" && index > 0) {
                    inputs[index - 1].focus();
                }
                
                const otp = Array.from(inputs).map(input => input.value).join('');
                if (otp.length === 4) {
                    verifyOTP(otp);
                }
            });
        });
    }

    async function verifyOTP(otp) {
        showLoader();
        try {
            // Simulate API verification
            await new Promise(resolve => setTimeout(resolve, 1000));
            hideLoader();
            nextPage(1);
        } catch (error) {
            hideLoader();
            alert('OTP verification failed. Please try again.');
        }
    }

    function retryAPI() {
        document.querySelector('.retry-btn').style.display = 'none';
        sendOTP();
    }

    // Update navigation functions with loading
    const originalNextPage = nextPage;
    nextPage = async function(currentPage) {
        if (validatePage(currentPage)) {
            showLoader();
            await new Promise(resolve => setTimeout(resolve, 1000));
            hideLoader();
            originalNextPage(currentPage);
        }
    }

    // Update API submission functions with loading
    const originalSubmitOwnerDetails = submitOwnerDetails;
    submitOwnerDetails = async function() {
        showLoader();
        try {
            await originalSubmitOwnerDetails();
        } finally {
            hideLoader();
        }
    }

    const originalSubmitStoreDetails = submitStoreDetails;
    submitStoreDetails = async function() {
        showLoader();
        try {
            await originalSubmitStoreDetails();
        } finally {
            hideLoader();
        }
    }
    function showLoader() {
        document.querySelector('.loader-overlay').style.display = 'flex';
    }
    
    function hideLoader() {
        document.querySelector('.loader-overlay').style.display = 'none';
    }
