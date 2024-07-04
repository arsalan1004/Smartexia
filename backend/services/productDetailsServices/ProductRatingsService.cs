using backend.data;
using backend.DTOs.productDetailsDto;

namespace backend.services.productDetailsServices;

public class ProductRatingsService
{
    private readonly smartexiaContext _smartexiaContext;

    public ProductRatingsService(smartexiaContext smartexiaContext)
    {
        _smartexiaContext = smartexiaContext;
    }
    
    public Task<ProductRatingsdto> getProductRatings(int productId)
    {
        try
        {
            float totalRatings = _smartexiaContext.Review.Where(x => x.productId == productId).Count();
            float overallRating = _smartexiaContext.Review.Where(x => x.productId == productId).Select(x => x.rating).Sum();
            
            float rating = totalRatings == 0 ? 0 : overallRating / totalRatings;
            
            ProductRatingsdto productRatingsdto = new ProductRatingsdto
            {
                rating = rating,
                totalRatings = totalRatings,
                overallRating = overallRating
            };
            
            return Task.FromResult(productRatingsdto);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return null;
        }
    }
}