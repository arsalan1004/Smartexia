using System.Globalization;
using ApiDependencies.DTOs.searchDto;
using backend.data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.controllers.searchproducts;

[ApiController]
public class ProductSearch: Controller
{
    private readonly smartexiaContext _smartexiaContext;

    public ProductSearch(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    [HttpPost]
    [Route("search/products")]
    //[ServiceFilter(typeof(TokenAuthenticationFilter))]
    public async Task<IActionResult> searchProducts([FromBody] searchQuerydto query)
    {
        try
        {
            TextInfo textInfo = CultureInfo.CurrentCulture.TextInfo;
            var products = await _smartexiaContext.Product
                .Where(x => x.name.Contains(textInfo.ToTitleCase(query.searchQuery)) 
                            && query.filters.SubCategory.Contains(x.subCategory) 
                            && x.price >= query.priceRange.min 
                            && x.price <= query.priceRange.max)
                .Select(x => new
                {
                    id = x.id,
                    name = x.name,
                    imageUrl = x.imageUrl,
                    price = x.price,
                    subCategory = x.subCategory,
                    rating = 0
                })
                .ToListAsync();

            return Ok(products);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return StatusCode(500, "Internal Server Error");
        }
    }
    
}