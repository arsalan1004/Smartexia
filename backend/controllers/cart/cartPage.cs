using ApiDependencies.filters.authFiler;
using backend.data;
using backend.DTOs.cartDto;
using Microsoft.AspNetCore.Mvc;
using backend.models.cart;
using backend.models.cartItem;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.cart;

[ApiController]
public class cartPage:Controller
{
    private readonly smartexiaContext _smartexiaContext;
    
    public cartPage(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    // ADD TO CART FUNCTION
    [HttpPost]
    [Route("cart/add")]
    [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> addToCart([FromBody] addToCartdto cartdto)
    {
        try
        {
            models.cart.cart userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == cartdto.userId);
            if (userCart is null)
            {
                var newcart = new models.cart.cart {
                    userId = cartdto.userId
                };
                _smartexiaContext.Cart.Add(newcart);
                userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == cartdto.userId);
            }
            cartItem item = new cartItem {
                cartId = userCart.id,
                productId = cartdto.productId,
                quantity = cartdto.quantity
            };
            _smartexiaContext.CartItem.Add(item);
            await _smartexiaContext.SaveChangesAsync();
            return Ok("Item added to cart");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    // GET CART PRODUCTS FUNCTION
    [HttpGet]
    [Route("cart/get")]
    [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> getCart([FromBody] int userId)
    {
        try
        {
            models.cart.cart userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == userId);
            if (userCart is null) return Ok(new {message = "Cart is empty", status=200});
            
            var cartItems = await _smartexiaContext.CartItem.Where(x => x.cartId == userCart.id).Include(x=>x.product).Select(item => new
            {
                id = item.id,
                name = item.product.name,
                price = item.product.price,
                quantity = item.quantity,
                image = item.product.imageUrl
            }).ToListAsync();
            
            if(!cartItems.Any()) return NotFound("No items in cart found");
            return Ok(cartItems);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    // DELETE ITEM FROM CART
    [HttpDelete]
    [Route("cart/delete")]
    [ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> deleteItem([FromBody] int itemId)
    {
        try
        {
            cartItem item =  _smartexiaContext.CartItem.FirstOrDefault(x => x.id == itemId);
            if (item is null) return NotFound("Item not found");
            _smartexiaContext.CartItem.Remove(item);
            await _smartexiaContext.SaveChangesAsync();
            return Ok("Item removed from cart");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
}