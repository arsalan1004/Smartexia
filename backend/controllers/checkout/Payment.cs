using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.Threading.Tasks;


[ApiController]
public class PaymentSheetController : ControllerBase
{
    public PaymentSheetController()
    {
        StripeConfiguration.ApiKey = "sk_test_51PO1TJRuuDG2jDrHeRdJ5DILyVtYSsyAX3HIxSEMmxeI5D5dNMH6IBliDKtr8ZJBh2H5Ixj9y4E0GaEEZ8gS6kQV006wU3KOsy";
    }

    [HttpPost]
    [Route("/checkout/payment")]
    public async Task<IActionResult> CreatePaymentSheet([FromBody] PaymentRequest request)
    {
        Console.WriteLine("Request hit");
        Console.WriteLine($"Request body: {request.Amount}");

        try
        {
            var customerService = new CustomerService();
            Console.WriteLine("Creating Customer Service");
            var customer = await customerService.CreateAsync(new CustomerCreateOptions());
            Console.WriteLine("Creating Customer");
            var ephemeralKeyService = new EphemeralKeyService();
            Console.WriteLine("Creating Ephemeral");
            var ephemeralKey = await ephemeralKeyService.CreateAsync(new EphemeralKeyCreateOptions
            {
                Customer = customer.Id,
                StripeVersion = "2023-10-16"
            });
            Console.WriteLine("Ephemeral Key", ephemeralKey.Secret);

            var paymentIntentService = new PaymentIntentService();
            Console.WriteLine("Creating Payment Intent");
            var paymentIntent = await paymentIntentService.CreateAsync(new PaymentIntentCreateOptions
            {
                Amount = request.Amount * 100,
                Currency = "usd",
                Customer = customer.Id,
            });

            Console.WriteLine("Response", paymentIntent.ClientSecret, ephemeralKey.Secret, customer.Id);

            return Ok(new
            {
                PaymentIntent = paymentIntent.ClientSecret,
                EphemeralKey = ephemeralKey.Secret,
                Customer = customer.Id
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error Caught", ex);
            Console.WriteLine("Error Caught", ex.Message);
            Console.WriteLine(ex);
            return StatusCode(400, new { Error = new { Message = ex.Message } });
        }
    }

    public class PaymentRequest
    {
        public long Amount { get; set; }
    }
}