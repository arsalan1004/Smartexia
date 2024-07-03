using ApiDependencies.filters.authFiler;
using backend.data;
using backend.models.orderItem;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.order;

[ApiController]
public class OrderController:Controller
{
    private readonly smartexiaContext _smartexiaContext;

    public OrderController(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }

    [HttpPost]
    [Route("/order/confirm")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> confirmOrder([FromBody] int userId)
    {
        try
        {
            models.cart.cart userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == userId);
            if (userCart is null) return Ok(new {message = "Cart is empty", status=200});
            
            var cartItems = await _smartexiaContext.CartItem.Where(x => x.cartId == userCart.id).Include(x=>x.product).Select(item => new
            {
                productId = item.id,
                productName = item.product.name,
                productPrice = item.product.price,
                productQuantity = item.quantity,
                image = item.product.imageUrl
            }).ToListAsync();
            if(!cartItems.Any()) return NotFound("No items in cart found");

            double totalPrice = 0;
            foreach (var item in cartItems)
            {
                totalPrice += item.productPrice * item.productQuantity;
            }

            if (totalPrice == 0) return BadRequest("Invalid product prices");

            ApiDependencies.models.order.order newOrder = new ApiDependencies.models.order.order
            {
                totalPrice = totalPrice,
                status = "Order Placed",
                orderDate = DateTime.Now,
                userId = userId
            };

            var createdOrder =  _smartexiaContext.Order.Where(x => x.userId == userId).Select(x => x.id).ToList();
            if (!createdOrder.Any()) return NotFound("No order found for user");
            
            foreach (var item in cartItems)
            {
                _smartexiaContext.OrderItem.Add(new OrderItem
                {
                    quantity = item.productQuantity,
                    price = item.productPrice,
                    productId = item.productId,
                    orderId = createdOrder[0]
                });
            }

            var cart = _smartexiaContext.Cart.FirstOrDefault(x => x.userId == userId);
            if (cart is null) return NotFound("Cart not found"); 
                
            _smartexiaContext.Cart.Remove(cart);
            await _smartexiaContext.SaveChangesAsync();
            
            return Ok("Order Placed Successfully");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpGet]
    [Route("/order/get")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> getOrders([FromBody] int userId)
    {
        try
        {
            var orders = await _smartexiaContext.Order.Where(x => x.userId == userId).ToListAsync();
            if (!orders.Any()) return NotFound("No orders found for user");
            
            var orderItems = await _smartexiaContext.OrderItem.Where(x => x.orderId == orders[0].id).Include(x => x.product).Select(item => new
            {
                productId = item.id,
                productName = item.product.name,
                productPrice = item.price,
                productQuantity = item.quantity,
                image = item.product.imageUrl
            }).ToListAsync();
            if (!orderItems.Any()) return NotFound("No items found in order");
            
            return Ok(orderItems);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
}
