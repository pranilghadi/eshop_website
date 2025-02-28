// first request- to server to create order

const paymentStart = () => {
    console.log("payment started..");
    let amount = $("#payment_field").val();
    console.log(amount);
    if (amount == "" || amount == null){
        alert("amount is required !!");
        swal("Failed !!", "amount is required !!" , "Error");
        return;
    }

    // code...
    // we will use ajax to send request to server to create order - jquery

    $.ajax(
        {
            url:'/user/create_order',
            data:JSON.stringify({amount:amount,info:'order_request'}),
            contentType:'application/json',
            type:'POST',
            dataType:'json',
            success:function(response){
                //invoked where success
                console.log(response);
                if(response.status == "created"){
                   // open payment form
                   let options={
                    key:'rzp_test_JtQx8QFml10BrH'
                    amount:response.amount,
                    currency:'INR',
                    name: 'Cara'
                    description:'Payment',
                    image:'apla logo tak',
                    order_id:response.id,
                    handler:function(response){

                        console.log(response.razorpay_payment_id);
                        console.log(response.razorpay_order_id);
                        console.log(response.razorpay_signature);
                        console.log('payment successful !!');
                        swal("Good job!", "congrats !! payment successful !!" , "success");
                    },

                    prefill:{
                        name: "",
                        email: "",
                        contact: "",
                    }

                    notes: {
                        address: "E commerce",
                    },

                    theme:{
                        color: "#3399cc",
                    }    

                   };

                   let rzp = new Razorpay(options);

                   rzp.on('payment.failed', function (response){
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    swal("Failed!", "oops payment failed !!" , "Error");
                    });
                    
                   rzp.open();



                }
                
            },
            error:function(error){
                //invoked where error
                console.log(error);
                alert("something went wrong !!");
            },
        }
    );
};