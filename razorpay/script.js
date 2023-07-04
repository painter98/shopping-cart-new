// Link for the documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration

// Add button code documentation:
// https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/build-integration#code-to-add-pay-button
const price=JSON.parse(sessionStorage.getItem("totalPrice"))
document.getElementById("rzp-button1").onclick = function (e) {

    var options = {
      key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
      amount: parseInt(price) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "MyShop Checkout",
      description: "Payment for your order at meShop", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#000",
      },
      image:
        "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
    };
  
    var rzpy1 = new Razorpay(options); //object of Razaorpay
    rzpy1.open();
    // clear mycart - sessionStorage
    e.preventDefault();
  };
