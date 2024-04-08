// function sendMail(){
//     var params={
//         from_name:document.getElementById("from_name").value,
//         email_id:document.getElementById("email_id").value,
//         message:document.getElementById("message").value,
//     }
//     emailjs.send("service_jx6sxvk","template_yii9pwd",params).then(function(res){
//         alert("Success! "+res.status);
//     })
// }

function sendMail() {
    console.log("sendMail function called"); // Check if function is being called
    var params = {
        from_name: document.getElementById("from_name").value,
        email_id: document.getElementById("email_id").value,
        message: document.getElementById("message").value,
        phone: document.getElementById("phone").value,
    };
    console.log("Params:", params); // Check the params being passed to emailjs.send()
    
    emailjs.send("service_jx6sxvk","template_yii9pwd",params)
        .then(function(res) {
            alert("Success! " + res.status);
            console.log("Email sent successfully:", res);
        })
        .catch(function(err) {
            alert("Error: " + err);
            console.error("Error sending email:", err);
        });
}
