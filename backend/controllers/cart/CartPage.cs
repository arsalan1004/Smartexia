using ApiDependencies.filters.authFiler;
using backend.data;
using backend.DTOs.cartDto;
using Microsoft.AspNetCore.Mvc;
using backend.models.cart;
using backend.models.cartItem;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.cart;

[ApiController]
public class CartPage:Controller
{
    private readonly smartexiaContext _smartexiaContext;
    
    public CartPage(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    // ADD TO CART FUNCTION
    [HttpPost]
    [Route("cart/add")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
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
                await _smartexiaContext.SaveChangesAsync();
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
    [HttpPost]
    [Route("cart/get")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> getCart([FromBody] int userId)
    {
        try
        {
            models.cart.cart userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == userId);
            if (userCart is null) return Ok(new {message = "Cart is empty", status=200});
            
            var cartItems = await _smartexiaContext.CartItem.Where(x => x.cartId == userCart.id).Include(x=>x.product).Select(item => new
            {
                productId = item.productId,
                productName = item.product.name,
                productPrice = item.product.price,
                productQuantity = item.quantity,
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
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> deleteItem([FromBody] DeleteItemdto itemDetails)
    {
        try
        {
            models.cart.cart userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == itemDetails.userId);
            if (userCart is null)
            {
                return NotFound("Cart not found");
            }

            cartItem item =  _smartexiaContext.CartItem.FirstOrDefault(x => x.cartId == userCart.id && x.productId == itemDetails.productId);
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
    
    [HttpPost]
    [Route("/cart/increment")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> incrementItem([FromBody] IncrementCartdto cartDetails)
    {
        try
        {
            models.cart.cart userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == cartDetails.userId);
            if (userCart is null)
            {
                var newcart = new models.cart.cart {
                    userId = cartDetails.userId
                };
                _smartexiaContext.Cart.Add(newcart);
                await _smartexiaContext.SaveChangesAsync();
                cartItem itemToAdd = new cartItem {
                    cartId = userCart.id,
                    productId = cartDetails.productId,
                    quantity = cartDetails.quantity
                };
                _smartexiaContext.CartItem.Add(itemToAdd);
                await _smartexiaContext.SaveChangesAsync();
                return Ok("Item added to cart");
            };
            
            cartItem item =  _smartexiaContext.CartItem.FirstOrDefault(x => x.productId == cartDetails.productId && x.cartId == userCart.id);

            if (item is null)
            {
                cartItem itemToAdd = new cartItem {
                    cartId = userCart.id,
                    productId = cartDetails.productId,
                    quantity = cartDetails.quantity
                };
                _smartexiaContext.CartItem.Add(itemToAdd);
                await _smartexiaContext.SaveChangesAsync();
                return Ok("Item added to cart");
            };
            item.quantity += cartDetails.quantity;
            await _smartexiaContext.SaveChangesAsync();
            return Ok("Item quantity incremented");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
    [HttpPost]
    [Route("/cart/decrement")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> decrementItem([FromBody] IncrementCartdto cartDetails)
    {
        try
        {
            models.cart.cart userCart =  _smartexiaContext.Cart.FirstOrDefault(x => x.userId == cartDetails.userId);
            if (userCart is null)
            {
                return Ok("No cart found");
            };
            
            cartItem item =  _smartexiaContext.CartItem.FirstOrDefault(x => x.productId == cartDetails.productId && x.cartId == userCart.id);

            if (item is null)
            {
                return Ok("Item not found in cart");
            };
            
            if(item.quantity - cartDetails.quantity <= 0)
            {
                _smartexiaContext.CartItem.Remove(item);
                await _smartexiaContext.SaveChangesAsync();
                return Ok("Item removed from cart");
            }
            
            item.quantity -= cartDetails.quantity;
            await _smartexiaContext.SaveChangesAsync();
            return Ok("Item quantity decremented");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
}